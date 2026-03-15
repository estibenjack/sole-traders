const conn = require('../utils/dbconn');

exports.getAvailabilityByTrader = (req, res) => {
  const { id } = req.params;
  const selectSQL = `
    SELECT *
    FROM trader_availability
    WHERE trader_id = ?
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
        message: `${rows.length} records retrieved for trader with ID: ${id}`,
        result: rows
      });
    }
  });
};
