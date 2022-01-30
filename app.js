if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path');
const ejsMate = require('ejs-mate');

const app = express();
const initializePassport = require('./public/javascript/passport-config');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = [];

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


app.get('/', checkNotAuthenticated, (req, res) => {
    res.render('home');
});

app.post('/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/mainMenu',
    failureRedirect: '/',
    failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('users/register');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/')
    } catch {
      res.redirect('/register')
    }
});

app.get('/mainMenu', checkAuthenticated, (req, res) => {
    res.render('mainMenu');
});

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login');
};
  
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next();
};

app.listen(port, () => {
    console.log("Serving in port 3000");
});