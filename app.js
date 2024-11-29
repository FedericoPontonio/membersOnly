const express = require('express');
require('dotenv').config();
const expressLayouts= require('express-ejs-layouts')
const passport = require("./config/passport");
const session = require("express-session");

//routes import
const indexRouter = require('./routes/index');
const signUpRouter = require('./routes/userRoutes/signUp');
const obtainPrivilegesRouter = require('./routes/userRoutes/obtainPrivileges');
const loginRouter = require('./routes/userRoutes/login');
const logoutRouter = require('./routes/userRoutes/logout');
const newMessageRouter = require('./routes/messagesRoute/newMessage');
const deleteMessageRouter = require('./routes/messagesRoute/deleteMessage');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
    session({ secret: "cats", resave: false, saveUninitialized: false, cookie: { maxAge: 24 * 60 * 60 * 1000 }, })
  );
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))   //do I need this?
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/signUp', signUpRouter);
app.use('/obtainPrivileges', obtainPrivilegesRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/newMessage', newMessageRouter);
app.use('/deleteMessage', deleteMessageRouter);

app.listen(process.env.PORT || 3000)