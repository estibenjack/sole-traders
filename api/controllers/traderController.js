const conn = require('../utils/dbconn');

exports.getAllTraders = (req, res) => {
  // only select whats needed for public-facing
  const selectSQL =
    'SELECT id, name, trade_type, region, bio, created_at FROM traders';

  conn.query(selectSQL, (err, rows) => {
    if (err) {
      // console.log('Database error:', err);
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: `${rows.length} records retrieved`,
        result: rows
      });
    }
  });
};

exports.getTraderById = (req, res) => {
  const { id } = req.params;

  // same as above - only public fields
  const selectSQL = `
    SELECT id, name, trade_type, region, bio, created_at
    FROM traders
    WHERE id = ?
  `;

  conn.query(selectSQL, [id], (err, rows) => {
    if (err) {
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
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
    }
  });
};

exports.addTrader = (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    res.status(400).json({
      status: 'failure',
      message: 'All fields required'
    });
    return;
  }

  const insertSQL =
    'INSERT INTO traders (name, username, email, password) VALUES (?, ?, ?, ?)';

  const vals = [name, username, email, password];

  conn.query(insertSQL, vals, (err, resultHeader) => {
    if (err) {
      // catch duplicates
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
        message: 'Trader registered successfully',
        traderId: resultHeader.insertId
      });
    }
  });
};

exports.editTrader = (req, res) => {
  const { id } = req.params;
  const name = req.body.name
    ? req.body.name.trim().replace(/\b\w/g, (c) => c.toUpperCase())
    : '';
  const email = req.body.email ? req.body.email.trim().toLowerCase() : '';
  const { trade_type, region, bio } = req.body;

  // only name and email are required
  if (!name || !email) {
    return res.status(400).json({
      status: 'failure',
      message: 'Name and email are required'
    });
  }

  const updateSQL = `
    UPDATE traders 
    SET name = ?, email = ?, trade_type = ?, region = ?, bio = ?
    WHERE id = ?
  `;

  // optional fields have 'null' as fallback if not in req.body
  const vals = [
    name,
    email,
    trade_type || null,
    region || null,
    bio || null,
    id
  ];

  conn.query(updateSQL, vals, (err, resultHeader) => {
    if (err) {
      // catch if they try to change to an already registered email
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          status: 'failure',
          message: 'Email already in use'
        });
      }
      return res.status(500).json({ status: 'failure', message: err.message });
    } else {
      if (resultHeader.length === 0) {
        res.status(404).json({
          status: 'failure',
          message: `No trader found with ID: ${id}`
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: `Trader ${id} updated`
        });
      }
    }
  });
};

exports.deleteTrader = (req, res) => {
  const { id } = req.params;

  const deleteSQL = 'DELETE FROM traders WHERE id = ?';

  conn.query(deleteSQL, [id], (err, resultHeader) => {
    if (err) {
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
      if (resultHeader.affectedRows === 0) {
        res.status(404).json({
          status: 'failure',
          message: `No trader found with ID: ${id}`
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: `Trader with ID: ${id} deleted successfully`
        });
      }
    }
  });
};

// protected - only for dash to get full prof info
exports.getTraderProfileInfoById = (req, res) => {
  const { id } = req.params;

  const selectSQL = `
    SELECT id, name, email, username, trade_type, region, bio, created_at
    FROM traders
    WHERE id = ?
  `;

  conn.query(selectSQL, [id], (err, rows) => {
    if (err) {
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
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
    }
  });
};
