const bcrypt = require('bcrypt');
const conn = require('../utils/dbconn');


exports.register = (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    res.status(400);
    return res.json({
      status: 'failure',
      message: 'All fields are required'
    });
  }

  // hash pw w/ bcrypt (10 salt level for lots of protec)
  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      // console.error('Bcrypt error:', hashErr);
      res.status(500);
      return res.json({
        status: 'failure',
        message: 'Password hashing failed'
      });
    }

    const vals = [name, username, email, hashedPassword];

    const insertSQL = `
      INSERT INTO traders (name, username, email, password)
      VALUES (?, ?, ?, ?)
    `;

    conn.query(insertSQL, vals, (err, resultHeader) => {
      if (err) {
        console.error('Database error:', err);

        // check for duplicate username/email
        if (err.code === 'ER_DUP_ENTRY') {
          res.status(409).json({
            status: 'failure',
            message: 'Username or email already exists'
          });
        } else {
          res.status(500).json({
            status: 'failure',
            message: err.message
          });
        }
      } else {
        res.status(201).json({
          status: 'success',
          message: `Trader registered successfully with ID: ${resultHeader.insertId}`,
          traderId: resultHeader.insertId
        });
      }
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    return res.json({
      status: 'failure',
      message: 'Username and password are required'
    });
  }

  const selectSQL = `SELECT * FROM traders WHERE username = ?`;

  const vals = [username];

  conn.query(selectSQL, vals, (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500);
      return res.json({
        status: 'failure',
        message: 'Server error'
      });
    }

    // check if trader exists
    if (rows.length === 0) {
      res.status(401);
      return res.json({
        status: 'failure',
        message: 'Invalid username or password'
      });
    }

    const trader = rows[0];

    // compare pw (submitted) with hashed pw (in db)
    bcrypt.compare(password, trader.password, (bcryptErr, match) => {
      if (bcryptErr) {
        res.status(500);
        return res.json({
          status: 'failure',
          message: 'Password verification failed'
        });
      }

      if (!match) {
        res.status(401);
        return res.json({
          status: 'failure',
          message: 'Invalid username or password'
        });
      }

      // if pw correct:
      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        result: {
          id: trader.id,
          username: trader.username,
          name: trader.name,
          email: trader.email
        }
      });
    });
  });
};
