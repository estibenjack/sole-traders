const conn = require('../utils/dbconn');
const { isPositiveInt } = require('../utils/validate');

exports.getRatingsByTrader = (req, res) => {
  const { id } = req.params;

  const selectSQL = `SELECT *
    FROM ratings
    WHERE trader_id = ?
    ORDER BY created_at DESC
  `;

  conn.query(selectSQL, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    res.status(200).json({
      status: 'success',
      message: `${rows.length} ratings retrieved for trader ID: ${id}`,
      result: rows
    });
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
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    if (rows.length > 0) {
      res.status(200).json({
        status: 'success',
        message: `Average rating retrieved for trader ID: ${id}`,
        result: rows[0]
      });
    } else {
      // fallback for traders with no ratings yet
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
  });
};

exports.addRating = (req, res) => {
  const reviewerName = req.body.reviewer_name
    ? req.body.reviewer_name.trim().replace(/\b\w/g, (c) => c.toUpperCase())
    : '';
  const { trader_id, rating } = req.body;

  if (!trader_id || !reviewerName || !rating) {
    return res.status(400).json({
      status: 'failure',
      message: 'All fields are required'
    });
  }

  if (!isPositiveInt(trader_id)) {
    return res.status(400).json({
      status: 'failure',
      message: 'Invalid trader ID'
    });
  }

  if (reviewerName.length > 100) {
    return res.status(400).json({
      status: 'failure',
      message: 'Reviewer name must be 100 characters or fewer'
    });
  }

  const ratingNum = parseInt(rating, 10);
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({
      status: 'failure',
      message: 'Rating must be a number between 1 and 5'
    });
  }

  const insertSQL =
    'INSERT INTO ratings (trader_id, reviewer_name, rating) VALUES (?, ?, ?)';
  const vals = [trader_id, reviewerName, ratingNum];

  conn.query(insertSQL, vals, (err, resultHeader) => {
    if (err) {
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    res.status(201).json({
      status: 'success',
      message: `Rating submitted successfully with ID ${resultHeader.insertId}`,
      ratingId: resultHeader.insertId
    });
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
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    res.status(200).json({
      status: 'success',
      message: `${rows.length} average ratings retrieved`,
      result: rows
    });
  });
};
