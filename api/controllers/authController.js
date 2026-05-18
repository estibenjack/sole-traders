const bcrypt = require('bcrypt');
const conn = require('../utils/dbconn');
const { isValidEmail } = require('../utils/validate');

exports.register = (req, res) => {
  const name = req.body.name
    ? req.body.name.trim().replace(/\b\w/g, (c) => c.toUpperCase())
    : '';
  const username = req.body.username
    ? req.body.username.trim().toLowerCase()
    : '';
  const email = req.body.email ? req.body.email.trim().toLowerCase() : '';
  const { password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({
      status: 'failure',
      message: 'All fields are required'
    });
  }

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({
      status: 'failure',
      message: 'Name must be between 2 and 100 characters'
    });
  }

  if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
    return res.status(400).json({
      status: 'failure',
      message: 'Username must be 3–30 characters and contain only letters, numbers, or underscores'
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      status: 'failure',
      message: 'Invalid email address'
    });
  }

  if (password.length < 8 || password.length > 128) {
    return res.status(400).json({
      status: 'failure',
      message: 'Password must be between 8 and 128 characters'
    });
  }

  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      return res.status(500).json({
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

        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            status: 'failure',
            message: 'Username or email already exists'
          });
        } else {
          return res.status(500).json({
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
  const username = req.body.username
    ? req.body.username.trim().toLowerCase()
    : '';
  const { password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 'failure',
      message: 'Username and password are required'
    });
  }

  // prevent oversized payloads reaching bcrypt
  if (username.length > 30 || password.length > 128) {
    return res.status(401).json({
      status: 'failure',
      message: 'Invalid username or password'
    });
  }

  const selectSQL = `SELECT * FROM traders WHERE username = ?`;

  conn.query(selectSQL, [username], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        status: 'failure',
        message: 'Server error'
      });
    }

    if (rows.length === 0) {
      return res.status(401).json({
        status: 'failure',
        message: 'Invalid username or password'
      });
    }

    const trader = rows[0];

    bcrypt.compare(password, trader.password, (bcryptErr, match) => {
      if (bcryptErr) {
        return res.status(500).json({
          status: 'failure',
          message: 'Password verification failed'
        });
      }

      if (!match) {
        return res.status(401).json({
          status: 'failure',
          message: 'Invalid username or password'
        });
      }

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
