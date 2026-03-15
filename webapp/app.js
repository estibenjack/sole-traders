const express = require('express');
const router = require('./routes/routes');
const morgan = require('morgan');
const dotenv = require('dotenv').config({ path: './config.env' });
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const rootPath = path.join(__dirname);
console.log(rootPath);

const app = express();

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

app.use(morgan('tiny'));
app.use(express.static(path.join(rootPath, '/public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(process.env.PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Express Web App listening on port: ${process.env.PORT}`);
});
