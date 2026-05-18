const conn = require('../utils/dbconn');
const { isValidEmail, isPositiveInt } = require('../utils/validate');

exports.getBookingById = (req, res) => {
  const { id } = req.params;

  const selectSQL = `
    SELECT b.*, s.title AS service_title
    FROM bookings b
    JOIN services s ON b.service_id = s.id
    WHERE b.id = ?
  `;

  conn.query(selectSQL, [id], (err, rows) => {
    if (err) {
      console.log('Database error:', err);
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

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
  });
};

exports.getBookingsByTrader = (req, res) => {
  const { id } = req.params;

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
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    res.status(200).json({
      status: 'success',
      message: `${rows.length} bookings retrieved for trader ID: ${id}`,
      result: rows
    });
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

  if (!isPositiveInt(service_id)) {
    return res.status(400).json({
      status: 'failure',
      message: 'Invalid service ID'
    });
  }

  if (!isValidEmail(clientEmail)) {
    return res.status(400).json({
      status: 'failure',
      message: 'Invalid email address'
    });
  }

  if (clientName.length > 100) {
    return res.status(400).json({
      status: 'failure',
      message: 'Client name must be 100 characters or fewer'
    });
  }

  if (jobLocation.length > 255) {
    return res.status(400).json({
      status: 'failure',
      message: 'Job location must be 255 characters or fewer'
    });
  }

  if (jobDescription.length > 1000) {
    return res.status(400).json({
      status: 'failure',
      message: 'Job description must be 1000 characters or fewer'
    });
  }

  const bookingDate = new Date(requested_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(bookingDate.getTime()) || bookingDate < today) {
    return res.status(400).json({
      status: 'failure',
      message: 'Requested date must be valid and cannot be in the past'
    });
  }

  if (!/^\d{2}:\d{2}$/.test(requested_time)) {
    return res.status(400).json({
      status: 'failure',
      message: 'Requested time must be in HH:MM format'
    });
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
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    res.status(201).json({
      status: 'success',
      message: `Booking submitted successfully with ID: ${resultHeader.insertId}`,
      bookingId: resultHeader.insertId
    });
  });
};

exports.updateBookingStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'confirmed', 'rejected'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      status: 'failure',
      message: 'Status must be: pending, confirmed or rejected'
    });
  }

  const updateSQL = 'UPDATE bookings SET status = ? WHERE id = ?';

  conn.query(updateSQL, [status, id], (err, resultHeader) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    if (resultHeader.affectedRows === 0) {
      return res.status(404).json({
        status: 'failure',
        message: `No booking found with ID: ${id}`
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Booking with ID: ${id} updated to ${status}`
    });
  });
};

exports.getTraderStats = (req, res) => {
  const { id } = req.params;

  const bookingsPerServiceSQL = `
    SELECT s.title, COUNT(b.id) AS booking_count
    FROM bookings b
    JOIN services s ON b.service_id = s.id
    WHERE b.trader_id = ?
    GROUP BY s.id, s.title
    ORDER BY booking_count DESC
  `;

  const avgPerMonthSQL = `
    SELECT ROUND(AVG(monthly_count), 1) AS avg_per_month
    FROM (
      SELECT COUNT(*) AS monthly_count
      FROM bookings
      WHERE trader_id = ?
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
    ) AS monthly
  `;

  conn.query(bookingsPerServiceSQL, [id], (err, serviceRows) => {
    if (err) {
      console.log('Database error:', err);
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    conn.query(avgPerMonthSQL, [id], (err, avgRows) => {
      if (err) {
        console.log('Database error:', err);
        return res.status(500).json({
          status: 'failure',
          message: err.message
        });
      }

      res.status(200).json({
        status: 'success',
        result: {
          bookingsPerService: serviceRows,
          avgBookingsPerMonth: Math.floor(avgRows[0].avg_per_month) || 0
        }
      });
    });
  });
};
