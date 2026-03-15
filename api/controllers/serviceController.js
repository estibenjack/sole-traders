const conn = require('../utils/dbconn');

exports.getAllServices = (req, res) => {
  const selectSQL = 'SELECT * FROM services';

  conn.query(selectSQL, (err, rows) => {
    if (err) {
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

exports.getServiceById = (req, res) => {
  const { id } = req.params;

  const selectSQL = 'SELECT * FROM services WHERE id = ?';

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
          message: `Record retrieved for service with ID: ${id}`,
          result: rows[0]
        });
      } else {
        res.status(404).json({
          status: 'failure',
          message: `No service found with ID: ${id}`
        });
      }
    }
  });
};

exports.getServicesByTrader = (req, res) => {
  const { id } = req.params;

  const selectSQL = 'SELECT * FROM services WHERE trader_id = ?';

  conn.query(selectSQL, [id], (err, rows) => {
    if (err) {
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: `${rows.length} records retrieved for trader ID: ${id}`,
        result: rows
      });
    }
  });
};

exports.addService = (req, res) => {
  const {
    trader_id,
    title,
    description,
    pricing_type,
    base_price,
    estimated_duration_mins
  } = req.body;

  if (
    !trader_id ||
    !title ||
    !description ||
    !pricing_type ||
    !base_price ||
    !estimated_duration_mins
  ) {
    res.status(400).json({
      status: 'failure',
      message: 'All fields required'
    });
    return;
  }

  // pricing_type is enum in db so check for valid input
  if (!['hourly', 'fixed'].includes(pricing_type)) {
    res.status(400).json({
      status: 'failure',
      message: 'Pricing type must be hourly or fixed'
    });
    return;
  }

  // make sure price is acc a positive num
  if (isNaN(base_price) || base_price <= 0) {
    res.status(400).json({
      status: 'failure',
      message: 'Base price must be more than £0'
    });
    return;
  }

  if (isNaN(estimated_duration_mins) || estimated_duration_mins <= 0) {
    res.status(400).json({
      status: 'failure',
      message: 'Estimated duration must be more than 0'
    });
    return;
  }

  const insertSQL = `
    INSERT INTO services (trader_id, title, description, pricing_type, base_price, estimated_duration_mins)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const vals = [
    trader_id,
    title,
    description,
    pricing_type,
    base_price,
    estimated_duration_mins
  ];

  conn.query(insertSQL, vals, (err, resultHeader) => {
    if (err) {
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
      res.status(201).json({
        status: 'success',
        message: `Service created successfully with ID: ${resultHeader.insertId}`,
        serviceId: resultHeader.insertId
      });
    }
  });
};

exports.editService = (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    pricing_type,
    base_price,
    estimated_duration_mins
  } = req.body;

  if (
    !title ||
    !description ||
    !pricing_type ||
    !base_price ||
    !estimated_duration_mins
  ) {
    res.status(400).json({
      status: 'failure',
      message: 'All fields required'
    });
    return;
  }

  if (!['hourly', 'fixed'].includes(pricing_type)) {
    res.status(400).json({
      status: 'failure',
      message: 'Pricing type must be hourly or fixed'
    });
    return;
  }

  if (isNaN(base_price) || base_price <= 0) {
    res.status(400).json({
      status: 'failure',
      message: 'Base price must be more than £0'
    });
    return;
  }

  if (isNaN(estimated_duration_mins) || estimated_duration_mins <= 0) {
    res.status(400).json({
      status: 'failure',
      message: 'Estimated duration must be more than 0'
    });
    return;
  }

  const updateSQL = `
    UPDATE services
    SET title = ?, description = ?, pricing_type = ?, base_price = ?, estimated_duration_mins = ?
    WHERE id = ?
  `;
  const vals = [
    title,
    description,
    pricing_type,
    base_price,
    estimated_duration_mins,
    id
  ];

  conn.query(updateSQL, vals, (err, resultHeader) => {
    if (err) {
      res.status(500).json({
        status: 'failure',
        message: err.message
      });
    } else {
      if (resultHeader.affectedRows === 0) {
        res.status(404).json({
          status: 'failure',
          message: `No service found with ID: ${id}`
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: `Service with ID: ${id} updated successfully`
        });
      }
    }
  });
};

exports.deleteService = (req, res) => {
  const { id } = req.params;

  const deleteSQL = 'DELETE FROM services WHERE id = ?';

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
          message: `No service found with ID: ${id}`
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: `Service with ID: ${id} deleted successfully`
        });
      }
    }
  });
};
