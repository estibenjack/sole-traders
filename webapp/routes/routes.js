const express = require('express');
const router = express.Router();
const webAppController = require('../controllers/webAppController');
const { isAuth } = require('../middleware/middleware');

// auth routes
router.get('/', webAppController.getHomePage);
router.get('/register', webAppController.getRegisterPage);
router.post('/register', webAppController.postRegister);
router.get('/login', webAppController.getLoginPage);
router.post('/login', webAppController.postLogin);
router.get('/logout', webAppController.getLogout);

// browse (public)
router.get('/traders', webAppController.getBrowseTraders);
router.get('/traders/:id', webAppController.getTraderProfile);
router.post('/traders/:id/booking', webAppController.postBooking);
router.post('/traders/:id/rating', webAppController.postRating);

// dashboard (protected)
router.get('/dashboard', isAuth, webAppController.getDashboard);
router.post('/profile/edit', isAuth, webAppController.postEditProfile);

// service-specific
router.post('/services/add', isAuth, webAppController.postAddService);
router.post('/services/edit/:id', isAuth, webAppController.postEditService);
router.post('/services/delete/:id', isAuth, webAppController.postDeleteService);

// booking-specific
router.post('/bookings/:id/accept', isAuth, webAppController.postAcceptBooking);
router.post('/bookings/:id/reject', isAuth, webAppController.postRejectBooking);

// handle error 404
router.use(webAppController.handleError404);

module.exports = router;
