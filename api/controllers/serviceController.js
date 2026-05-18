const conn = require('../utils/dbconn');
const { isPositiveInt } = require('../utils/validate');

exports.getAllServices = (req, res) => {
  const selectSQL = 'SELECT * FROM services';

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

exports.getServiceById = (req, res) => {
  const { id } = req.params;

  const selectSQL = 'SELECT * FROM services WHERE id = ?';

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
        message: `Record retrieved for service with ID: ${id}`,
        result: rows[0]
      });
    } else {
      res.status(404).json({
        status: 'failure',
        message: `No service found with ID: ${id}`
      });
    }
  });
};

exports.getServicesByTrader = (req, res) => {
  const { id } = req.params;

  const selectSQL = 'SELECT * FROM services WHERE trader_id = ?';

  conn.query(selectSQL, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    res.status(200).json({
      status: 'success',
      message: `${rows.length} records retrieved for trader ID: ${id}`,
      result: rows
    });
  });
};

exports.addService = (req, res) => {
  const title = req.body.title ? req.body.title.trim() : '';
  const description = req.body.description ? req.body.description.trim() : '';
  const { trader_id, pricing_type, base_price, estimated_duration_mins } =
    req.body;

  if (
    !trader_id ||
    !title ||
    !description ||
    !pricing_type ||
    !base_price ||
    !estimated_duration_mins
  ) {
    return res.status(400).json({
      status: 'failure',
      message: 'All fields required'
    });
  }

  if (!isPositiveInt(trader_id)) {
    return res.status(400).json({
      status: 'failure',
      message: 'Invalid trader ID'
    });
  }

  if (title.length < 3 || title.length > 100) {
    return res.status(400).json({
      status: 'failure',
      message: 'Title must be between 3 and 100 characters'
    });
  }

  if (description.length < 10 || description.length > 500) {
    return res.status(400).json({
      status: 'failure',
      message: 'Description must be between 10 and 500 characters'
    });
  }

  if (!['hourly', 'fixed'].includes(pricing_type)) {
    return res.status(400).json({
      status: 'failure',
      message: 'Pricing type must be hourly or fixed'
    });
  }

  const priceNum = parseFloat(base_price);
  if (isNaN(priceNum) || priceNum <= 0 || priceNum > 99999.99) {
    return res.status(400).json({
      status: 'failure',
      message: 'Base price must be between £0.01 and £99,999.99'
    });
  }

  const durationNum = parseInt(estimated_duration_mins, 10);
  if (isNaN(durationNum) || durationNum <= 0 || durationNum > 1440) {
    return res.status(400).json({
      status: 'failure',
      message: 'Estimated duration must be between 1 and 1440 minutes'
    });
  }

  const insertSQL = `
    INSERT INTO services (trader_id, title, description, pricing_type, base_price, estimated_duration_mins)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const vals = [trader_id, title, description, pricing_type, priceNum, durationNum];

  conn.query(insertSQL, vals, (err, resultHeader) => {
    if (err) {
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    res.status(201).json({
      status: 'success',
      message: `Service created successfully with ID: ${resultHeader.insertId}`,
      serviceId: resultHeader.insertId
    });
  });
};

exports.editService = (req, res) => {
  const { id } = req.params;
  const title = req.body.title ? req.body.title.trim() : '';
  const description = req.body.description ? req.body.description.trim() : '';
  const { pricing_type, base_price, estimated_duration_mins } = req.body;

  if (!title || !description || !pricing_type || !base_price || !estimated_duration_mins) {
    return res.status(400).json({
      status: 'failure',
      message: 'All fields required'
    });
  }

  if (title.length < 3 || title.length > 100) {
    return res.status(400).json({
      status: 'failure',
      message: 'Title must be between 3 and 100 characters'
    });
  }

  if (description.length < 10 || description.length > 500) {
    return res.status(400).json({
      status: 'failure',
      message: 'Description must be between 10 and 500 characters'
    });
  }

  if (!['hourly', 'fixed'].includes(pricing_type)) {
    return res.status(400).json({
      status: 'failure',
      message: 'Pricing type must be hourly or fixed'
    });
  }

  const priceNum = parseFloat(base_price);
  if (isNaN(priceNum) || priceNum <= 0 || priceNum > 99999.99) {
    return res.status(400).json({
      status: 'failure',
      message: 'Base price must be between £0.01 and £99,999.99'
    });
  }

  const durationNum = parseInt(estimated_duration_mins, 10);
  if (isNaN(durationNum) || durationNum <= 0 || durationNum > 1440) {
    return res.status(400).json({
      status: 'failure',
      message: 'Estimated duration must be between 1 and 1440 minutes'
    });
  }

  const updateSQL = `
    UPDATE services
    SET title = ?, description = ?, pricing_type = ?, base_price = ?, estimated_duration_mins = ?
    WHERE id = ?
  `;
  const vals = [title, description, pricing_type, priceNum, durationNum, id];

  conn.query(updateSQL, vals, (err, resultHeader) => {
    if (err) {
      return res.status(500).json({
        status: 'failure',
        message: err.message
      });
    }

    if (resultHeader.affectedRows === 0) {
      return res.status(404).json({
        status: 'failure',
        message: `No service found with ID: ${id}`
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Service with ID: ${id} updated successfully`
    });
  });
};

exports.deleteService = (req, res) => {
  const { id } = req.params;

  const deleteSQL = 'DELETE FROM services WHERE id = ?';

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
        message: `No service found with ID: ${id}`
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Service with ID: ${id} deleted successfully`
    });
  });
};
