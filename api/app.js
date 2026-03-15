const express = require('express');
const morgan = require('morgan');

const traderRouter = require('./routes/traderRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const ratingRouter = require('./routes/ratingRoutes');
const availabilityRouter = require('./routes/availabilityRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/traders', traderRouter);
app.use('/services', serviceRouter);
app.use('/bookings', bookingRouter);
app.use('/ratings', ratingRouter);
app.use('/availability', availabilityRouter);
app.use('/', authRouter);

module.exports = app;
