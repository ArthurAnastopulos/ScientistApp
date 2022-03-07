if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const passport = require('passport')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const request = require('request-promise');
const path = require('path');
const ejsMate = require('ejs-mate');

const app = express();

// configurantion =====================================================
// connect to our database
// require('./script/create_database')
require('./public/javascript/passport-config')(passport); // pass passport for configuration

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); // read cookies (for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//required for passport
app.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in sessi
app.use(methodOverride('_method'));

// routes =================================================== 

require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//  launch =================================================== 

app.listen(port, () => {
    console.log("Serving in port 3000");
});