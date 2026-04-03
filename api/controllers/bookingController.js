const conn = require('../utils/dbconn');

exports.getBookingById = (req, res) => {
  const { id } = req.params;

  // join services to get service title with booking
  const selectSQL = `
    SELECT b.*, s.title AS service_title
    FROM bookings b
    JOIN services s ON b.service_id = s.id
    WHERE b.id = ?
  `;

  conn.query(selectSQL, [id], (err, rows) => {
    if (err) {
      console.log('Database error:', err);
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
      if (rows.length > 0) {
        res.status(200).json({
          status: 'success',
          message: `Record retrieved for booking with ID: ${id}`,
          result: rows[0]
        });
      } else {
        res.status(404).json({
          status: 'failure',
          message: `No booking found with ID: ${id}`
        });
      }
    }
  });
};

exports.getBookingsByTrader = (req, res) => {
  const { id } = req.params;

  console.log(`Getting bookings for trader ID: ${id}`);

  // ORDER BY ... DESC to return newest first
  const selectSQL = `
    SELECT b.*, s.title AS service_title
    FROM bookings b
    JOIN services s ON b.service_id = s.id
    WHERE b.trader_id = ?
    ORDER BY b.created_at DESC
  `;

  conn.query(selectSQL, [id], (err, rows) => {
    if (err) {
      console.log('Database error:', err);
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: `${rows.length} bookings retrieved for trader ID: ${id}`,
        result: rows
      });
    }
  });
};

exports.addBooking = (req, res) => {
  const clientName = req.body.client_name
    ? req.body.client_name.trim().replace(/\b\w/g, (c) => c.toUpperCase())
    : '';
  const clientEmail = req.body.client_email
    ? req.body.client_email.trim().toLowerCase()
    : '';
  const jobLocation = req.body.job_location ? req.body.job_location.trim() : '';
  const jobDescription = req.body.job_description
    ? req.body.job_description.trim()
    : '';
  const { trader_id, service_id, requested_date, requested_time } = req.body;

  if (
    !trader_id ||
    !service_id ||
    !clientName ||
    !clientEmail ||
    !jobLocation ||
    !requested_date ||
    !requested_time ||
    !jobDescription
  ) {
    res.status(400).json({
      status: 'failure',
      message: 'All fields are required'
    });
    return;
  }

  const insertSQL = `
    INSERT INTO bookings (trader_id, service_id, client_name, client_email, job_location, requested_date, requested_time, job_description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const vals = [
    trader_id,
    service_id,
    clientName,
    clientEmail,
    jobLocation,
    requested_date,
    requested_time,
    jobDescription
  ];

  conn.query(insertSQL, vals, (err, resultHeader) => {
    if (err) {
      console.log('Database error:', err);
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
      res.status(201).json({
        status: 'success',
        message: `Booking submitted successfully with ID: ${resultHeader.insertId}`,
        bookingId: resultHeader.insertId
      });
    }
  });
};

// for trader to accent or reject booking from dashboard
exports.updateBookingStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'confirmed', 'rejected'];

  if (!status || !validStatuses.includes(status)) {
    res.status(400).json({
      status: 'failure',
      message: `Status must be: pending, confirmed or rejected`
    });
    return;
  }

  const updateSQL = 'UPDATE bookings SET status = ? WHERE id = ?';

  conn.query(updateSQL, [status, id], (err, resultHeader) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
      if (resultHeader.affectedRows === 0) {
        res.status(404).json({
          status: 'failure',
          message: `No booking found with ID: ${id}`
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: `Booking with ID: ${id} updated to ${status}`
        });
      }
    }
  });
};

// return two stats: booking per serv (doughnut)
exports.getTraderStats = (req, res) => {
  const { id } = req.params;

  // for doughnut
  const bookingsPerServiceSQL = `
    SELECT s.title, COUNT(b.id) AS booking_count
    FROM bookings b
    JOIN services s ON b.service_id = s.id
    WHERE b.trader_id = ?
    GROUP BY s.id, s.title
    ORDER BY booking_count DESC
  `;

  // for stat card
  /* 
  inner query - groups by month
  outer query - averages monthly totals
  */
  const avgPerMonthSQL = `
    SELECT ROUND(AVG(monthly_count), 1) AS avg_per_month
    FROM (
      SELECT COUNT(*) AS monthly_count
      FROM bookings
      WHERE trader_id = ?
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
    ) AS monthly
  `;

  // first query to db
  conn.query(bookingsPerServiceSQL, [id], (err, serviceRows) => {
    if (err) {
      console.log('Database error:', err);
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    // nested query in callback of first quer
    conn.query(avgPerMonthSQL, [id], (err, avgRows) => {
      if (err) {
        console.log('Database error:', err);
        return res.status(500).json({
          status: 'failure',
          message: err.message
        });
      }

      // when both are done, send combined result
      res.status(200).json({
        status: 'success',
        result: {
          bookingsPerService: serviceRows,
          // math floor the avg so it's a whole num
          avgBookingsPerMonth: Math.floor(avgRows[0].avg_per_month) || 0
        }
      });
    });
  });
};
