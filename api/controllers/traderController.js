const bcrypt = require('bcrypt');
const conn = require('../utils/dbconn');
const { isValidEmail } = require('../utils/validate');

exports.getAllTraders = (req, res) => {
  const selectSQL =
    'SELECT id, name, trade_type, region, bio, created_at FROM traders';

  conn.query(selectSQL, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    res.status(200).json({
      status: 'success',
      message: `${rows.length} records retrieved`,
      result: rows
    });
  });
};

exports.getTraderById = (req, res) => {
  const { id } = req.params;

  const selectSQL = `
    SELECT id, name, trade_type, region, bio, created_at
    FROM traders
    WHERE id = ?
  `;

  conn.query(selectSQL, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    if (rows.length > 0) {
      res.status(200).json({
        status: 'success',
        message: `Record retrieved for trader with ID: ${id}`,
        result: rows[0]
      });
    } else {
      res.status(404).json({
        status: 'failure',
        message: `No trader found with ID: ${id}`
      });
    }
  });
};

exports.addTrader = (req, res) => {
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
      message: 'All fields required'
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

    const insertSQL =
      'INSERT INTO traders (name, username, email, password) VALUES (?, ?, ?, ?)';

    conn.query(insertSQL, [name, username, email, hashedPassword], (err, resultHeader) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            status: 'failure',
            message: 'Username or email already exists'
          });
        }
        return res.status(500).json({
          status: 'failure',
          message: err.message
        });
      }

      res.status(201).json({
        status: 'success',
        message: 'Trader registered successfully',
        traderId: resultHeader.insertId
      });
    });
  });
};

exports.editTrader = (req, res) => {
  const { id } = req.params;
  const name = req.body.name
    ? req.body.name.trim().replace(/\b\w/g, (c) => c.toUpperCase())
    : '';
  const email = req.body.email ? req.body.email.trim().toLowerCase() : '';
  const bio = req.body.bio ? req.body.bio.trim() : null;
  const trade_type = req.body.trade_type ? req.body.trade_type.trim() : null;
  const region = req.body.region ? req.body.region.trim() : null;

  if (!name || !email) {
    return res.status(400).json({
      status: 'failure',
      message: 'Name and email are required'
    });
  }

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({
      status: 'failure',
      message: 'Name must be between 2 and 100 characters'
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      status: 'failure',
      message: 'Invalid email address'
    });
  }

  if (trade_type && trade_type.length > 100) {
    return res.status(400).json({
      status: 'failure',
      message: 'Trade type must be 100 characters or fewer'
    });
  }

  if (region && region.length > 100) {
    return res.status(400).json({
      status: 'failure',
      message: 'Region must be 100 characters or fewer'
    });
  }

  if (bio && bio.length > 1000) {
    return res.status(400).json({
      status: 'failure',
      message: 'Bio must be 1000 characters or fewer'
    });
  }

  const updateSQL = `
    UPDATE traders
    SET name = ?, email = ?, trade_type = ?, region = ?, bio = ?
    WHERE id = ?
  `;

  const vals = [name, email, trade_type, region, bio, id];

  conn.query(updateSQL, vals, (err, resultHeader) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          status: 'failure',
          message: 'Email already in use'
        });
      }
      return res.status(500).json({ status: 'failure', message: err.message });
    }

    if (resultHeader.affectedRows === 0) {
      return res.status(404).json({
        status: 'failure',
        message: `No trader found with ID: ${id}`
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Trader ${id} updated`
    });
  });
};

exports.deleteTrader = (req, res) => {
  const { id } = req.params;

  const deleteSQL = 'DELETE FROM traders WHERE id = ?';

  conn.query(deleteSQL, [id], (err, resultHeader) => {
    if (err) {
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    if (resultHeader.affectedRows === 0) {
      return res.status(404).json({
        status: 'failure',
        message: `No trader found with ID: ${id}`
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Trader with ID: ${id} deleted successfully`
    });
  });
};

exports.getTraderProfileInfoById = (req, res) => {
  const { id } = req.params;

  const selectSQL = `
    SELECT id, name, email, username, trade_type, region, bio, created_at
    FROM traders
    WHERE id = ?
  `;

  conn.query(selectSQL, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    if (rows.length > 0) {
      res.status(200).json({
        status: 'success',
        message: `Record retrieved for trader with ID: ${id}`,
        result: rows[0]
      });
    } else {
      res.status(404).json({
        status: 'failure',
        message: `No trader found with ID: ${id}`
      });
    }
  });
};
