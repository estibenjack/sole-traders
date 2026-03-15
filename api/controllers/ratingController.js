const conn = require('../utils/dbconn');

exports.getRatingsByTrader = (req, res) => {
  const { id } = req.params;
  
  // ORDER BY.. DESC to get newest first
  const selectSQL =
    `SELECT *
    FROM ratings
    WHERE trader_id = ?
    ORDER BY created_at DESC
  `;

  conn.query(selectSQL, [id], (err, rows) => {
    if (err) {
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: `${rows.length} ratings retrieved for trader ID: ${id}`,
        result: rows
      });
    }
  });
};

exports.getAverageRating = (req, res) => {
  const { id } = req.params;

  const selectSQL = `
    SELECT trader_id, ROUND(AVG(rating), 1) AS avg_rating, COUNT(*) AS total_ratings
    FROM ratings
    WHERE trader_id = ?
    GROUP BY trader_id
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
          message: `Average rating retrieved for trader ID: ${id}`,
          result: rows[0]
        });
      } else {
        // return fallback in case they've no ratings
        res.status(200).json({
          status: 'success',
          message: `No ratings yet for trader ID: ${id}`,
          result: {
            trader_id: id,
            avg_rating: null,
            total_ratings: 0
          }
        });
      }
    }
  });
};

exports.addRating = (req, res) => {
  const { trader_id, reviewer_name, rating } = req.body;

  if (!trader_id || !reviewer_name || !rating) {
    res.status(400).json({
      status: 'failure',
      message: 'All fields are required'
    });
    return;
  }

  // parseInt in case it's a string from form
  const ratingNum = parseInt(rating);
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    res.status(400).json({
      status: 'failure',
      message: 'Rating must be a number between 1 and 5'
    });
    return;
  }

  const insertSQL =
    'INSERT INTO ratings (trader_id, reviewer_name, rating) VALUES (?, ?, ?)';
  const vals = [trader_id, reviewer_name, ratingNum];

  conn.query(insertSQL, vals, (err, resultHeader) => {
    if (err) {
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
      res.status(201).json({
        status: 'success',
        message: `Rating submitted successfully with ID ${resultHeader.insertId}`,
        ratingId: resultHeader.insertId
      });
    }
  });
};

exports.getAllAverageRatings = (req, res) => {
  const selectSQL = `
    SELECT trader_id, ROUND(AVG(rating), 1) AS avg_rating, COUNT(*) AS total_ratings
    FROM ratings
    GROUP BY trader_id
  `;

  conn.query(selectSQL, (err, rows) => {
    if (err) {
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: `${rows.length} average ratings retrieved`,
        result: rows
      });
    }
  });
};
