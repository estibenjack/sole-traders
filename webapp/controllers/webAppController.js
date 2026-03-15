const axios = require('axios');
const { TRADE_TYPES, NI_REGIONS } = require('../utils/constants');

// auth

exports.getHomePage = (req, res) => {
  const flashMsg = req.cookies.flashMsg || null;
  res.clearCookie('flashMsg');
  res.status(200).render('home', {
    user: req.session.isLoggedIn
      ? { loggedIn: true, name: req.session.name }
      : {},
    successMsg: flashMsg
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register');
};

exports.postRegister = (req, res) => {
  let { name, username, email, password } = req.body;
  const endpoint = 'http://localhost:3002/register';

  name = name.trim().replace(/\b\w/g, (c) => c.toUpperCase());
  username = username.trim().toLowerCase();
  email = email.trim().toLowerCase();

  axios
    .post(endpoint, { name, username, email, password })
    .then((apiRes) => {
      // res.redirect('/login');
      res.redirect('/login?registered=true');
    })
    .catch((err) => {
      console.log(`API error: ${err}`);
      res.redirect('/register');
    });
};

exports.getLoginPage = (req, res) => {
  res.render('login', {
    error: null,
    success: req.query.registered
      ? 'Account created successfully! Please log in.'
      : null
  });
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  const endpoint = 'http://localhost:3002/login';

  axios
    .post(
      endpoint,
      { username, password },
      { validateStatus: (status) => status < 500 }
    )
    .then((apiRes) => {
      if (apiRes.status === 200 && apiRes.data.status === 'success') {
        req.session.isLoggedIn = true;
        req.session.userId = apiRes.data.result.id;
        req.session.name = apiRes.data.result.name;
        req.session.username = apiRes.data.result.username;
        return res.redirect('/dashboard');
      }
      return res.render('login', {
        error: 'Invalid username or password. Please try again.'
      });
    })
    .catch((err) => {
      console.log(`API error: ${err}`);
      return res.render('login', {
        error: 'Something went wrong. Please try again.'
      });
    });
};

exports.getLogout = (req, res) => {
  req.session.destroy();
  res.cookie('flashMsg', 'You have been logged out successfully.', {
    maxAge: 5000
  });
  res.redirect('/');
};

// browse

exports.getBrowseTraders = (req, res) => {
  const endpointTraders = 'http://localhost:3002/traders';
  const endpointAvgRatings = `http://localhost:3002/ratings/averages`;
  const { trade_type, region } = req.query;

  Promise.all([axios.get(endpointTraders), axios.get(endpointAvgRatings)])
    .then(([tradersRes, avgRatingsRes]) => {
      let ratings = avgRatingsRes.data.result;

      let traders = tradersRes.data.result.map((trader) => {
        const ratingData = ratings.find((r) => r.trader_id === trader.id);
        return {
          ...trader,
          avg_rating: ratingData ? ratingData.avg_rating : null,
          total_ratings: ratingData ? ratingData.total_ratings : 0
        };
      });

      if (trade_type) {
        traders = traders.filter((t) => t.trade_type === trade_type);
      }
      if (region) {
        traders = traders.filter((t) => t.region === region);
      }
      res.status(200).render('browseTraders', {
        traders,
        tradeTypes: TRADE_TYPES,
        regions: NI_REGIONS,
        selectedTradeType: trade_type || '',
        selectedRegion: region || '',
        user: req.session.isLoggedIn
          ? { loggedIn: true, name: req.session.name }
          : {}
      });
    })
    .catch((err) => {
      console.log(`API error: ${err}`);
      res.status(500).send('Something went wrong...');
    });
};

exports.getTraderProfile = (req, res) => {
  const { id } = req.params;
  const endpointTrader = `http://localhost:3002/traders/${id}`;
  const endpointServices = `http://localhost:3002/services/trader/${id}`;
  const endpointRatingAvg = `http://localhost:3002/ratings/trader/${id}/average`;
  const endpointAvailability = `http://localhost:3002/availability/trader/${id}`;
  const endpointReviews = `http://localhost:3002/ratings/trader/${id}`;

  Promise.all([
    axios.get(endpointTrader),
    axios.get(endpointServices),
    axios.get(endpointRatingAvg),
    axios.get(endpointAvailability),
    axios.get(endpointReviews)
  ])
    .then(
      ([traderRes, servicesRes, ratingRes, availabilityRes, reviewsRes]) => {
        let traderData = traderRes.data.result;
        let servicesData = servicesRes.data.result;
        let ratingData = ratingRes.data.result;
        let availabilityData = availabilityRes.data.result;
        let reviewsData = reviewsRes.data.result;

        res.status(200).render('traderProfile', {
          trader: traderData,
          services: servicesData,
          avgRating: ratingData,
          availability: availabilityData,
          reviews: reviewsData,
          bookingSuccess: req.query.bookingSuccess === 'true',
          bookingError: req.query.bookingError === 'true',
          ratingSuccess: req.query.ratingSuccess === 'true',
          ratingError: req.query.ratingError === 'true',
          fromDashboard: req.query.from === 'dashboard',
          user: req.session.isLoggedIn
            ? { loggedIn: true, name: req.session.name }
            : {}
        });
      }
    )
    .catch((err) => {
      console.log(`Error making API request: ${err}`);
      res.status(500).send('Something went wrong...');
    });
};

exports.postBooking = (req, res) => {
  const { id } = req.params;
  let {
    client_name,
    client_email,
    service_id,
    job_location,
    requested_date,
    requested_time,
    job_description,
    trader_id
  } = req.body;

  client_name = client_name.trim().replace(/\b\w/g, (c) => c.toUpperCase());
  client_email = client_email.trim().toLowerCase();
  job_location = job_location.trim();
  job_description = job_description.trim();

  axios
    .post('http://localhost:3002/bookings', {
      trader_id,
      service_id,
      client_name,
      client_email,
      job_location,
      requested_date,
      requested_time,
      job_description
    })
    .then(() => {
      res.redirect(`/traders/${id}?bookingSuccess=true`);
    })
    .catch((err) => {
      console.log(`API error: ${err}`);
      res.redirect(`/traders/${id}?bookingError=true`);
    });
};

exports.postRating = (req, res) => {
  const { id } = req.params;
  const { reviewer_name, rating, trader_id } = req.body;

  axios
    .post('http://localhost:3002/ratings', {
      trader_id,
      reviewer_name,
      rating: parseInt(rating)
    })
    .then(() => {
      res.redirect(`/traders/${id}?ratingSuccess=true`);
    })
    .catch((err) => {
      console.log(`API error: ${err}`);
      res.redirect(`/traders/${id}?ratingError=true`);
    });
};

// dashboard

exports.getDashboard = (req, res) => {
  const id = req.session.userId;
  const activeTab = req.query.tab || 'overview';
  const bookingStatus = req.query.status || 'all';

  if (!id) return res.redirect('/login');

  Promise.all([
    axios.get(`http://localhost:3002/traders/${id}/private`),
    axios.get(`http://localhost:3002/services/trader/${id}`),
    axios.get(`http://localhost:3002/bookings/trader/${id}`),
    axios.get(`http://localhost:3002/ratings/trader/${id}/average`),
    axios.get(`http://localhost:3002/bookings/trader/${id}/stats`)
  ])
    .then(([traderRes, servicesRes, bookingsRes, ratingRes, statsRes]) => {
      console.log(`traderRes response: ${traderRes.data}`);
      console.log(`servicesRes response: ${servicesRes.data}`);
      console.log(`bookingsRes response: ${bookingsRes.data}`);
      console.log(`ratingRes response: ${ratingRes.data}`);
      console.log(`statsRes response: ${statsRes.data}`);
      res.status(200).render('dashboard', {
        trader: traderRes.data.result,
        services: servicesRes.data.result,
        bookings: bookingsRes.data.result,
        avgRating: ratingRes.data.result,
        stats: statsRes.data.result,
        activeTab,
        bookingStatus,
        tradeTypes: TRADE_TYPES,
        regions: NI_REGIONS,
        successMsg: req.query.success || null,
        profileError: null,
        editMode: req.query.edit === 'true',
        editServiceId: req.query.edit ? parseInt(req.query.edit) : null,
        user: req.session.isLoggedIn
          ? { loggedIn: true, name: req.session.name }
          : {}
      });
    })
    .catch((err) => {
      console.log(`API error: ${err}`);
      res.status(500).send('Something went wrong...');
    });
};

exports.postEditProfile = (req, res) => {
  const id = req.session.userId;
  const { name, email, trade_type, region, bio } = req.body;

  axios
    .put(`http://localhost:3002/traders/${id}`, {
      name: name,
      email: email,
      trade_type: trade_type || null,
      region: region || null,
      bio: bio || null
    })
    .then(() => {
      res.redirect(
        '/dashboard?tab=profile&success=Profile updated successfully'
      );
    })
    .catch((err) => {
      console.log(`API error: ${err}`);
      res.redirect('/dashboard?tab=profile');
    });
};

exports.postAddService = (req, res) => {
  let {
    title,
    description,
    pricing_type,
    base_price,
    estimated_duration_mins
  } = req.body;
  const trader_id = req.session.userId;

  title = title
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  description = description.trim();

  axios
    .post('http://localhost:3002/services', {
      trader_id,
      title,
      description,
      pricing_type,
      base_price: parseFloat(base_price),
      estimated_duration_mins: estimated_duration_mins
        ? parseInt(estimated_duration_mins)
        : null
    })
    .then(() => {
      res.redirect(
        '/dashboard?tab=services&success=Service added successfully'
      );
    })
    .catch((err) => {
      console.log(`API error: ${err}`);
      res.redirect('/dashboard?tab=services');
    });
};

exports.postEditService = (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    pricing_type,
    base_price,
    estimated_duration_mins
  } = req.body;

  axios
    .put(`http://localhost:3002/services/${id}`, {
      title,
      description,
      pricing_type,
      base_price: parseFloat(base_price),
      estimated_duration_mins: estimated_duration_mins
        ? parseInt(estimated_duration_mins)
        : null
    })
    .then(() => {
      res.redirect(
        '/dashboard?tab=services&success=Service updated successfully'
      );
    })
    .catch((err) => {
      console.log(`API error: ${err}`);
      res.redirect('/dashboard?tab=services');
    });
};

exports.postDeleteService = (req, res) => {
  const { id } = req.params;

  axios
    .delete(`http://localhost:3002/services/${id}`)
    .then(() => {
      res.redirect('/dashboard?tab=services&success=Service deleted');
    })
    .catch((err) => {
      console.log(`API error: ${err}`);
      res.redirect('/dashboard?tab=services');
    });
};

exports.postAcceptBooking = (req, res) => {
  const { id } = req.params;

  axios
    .put(`http://localhost:3002/bookings/${id}/status`, { status: 'confirmed' })
    .then(() => {
      res.redirect('/dashboard?tab=bookings&success=Booking confirmed');
    })
    .catch((err) => {
      console.log(`API error: ${err}`);
      res.redirect('/dashboard?tab=bookings');
    });
};

exports.postRejectBooking = (req, res) => {
  const { id } = req.params;

  axios
    .put(`http://localhost:3002/bookings/${id}/status`, { status: 'rejected' })
    .then(() => {
      res.redirect('/dashboard?tab=bookings&success=Booking rejected');
    })
    .catch((err) => {
      console.log(`API error: ${err}`);
      res.redirect('/dashboard?tab=bookings');
    });
};

// handle error 404 and pages that don't exist
exports.handleError404 = (req, res) => {
  res.status(404).render('error404', {
    user: req.session.isLoggedIn
      ? { loggedIn: true, name: req.session.name }
      : {}
  });
};
