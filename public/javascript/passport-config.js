const LocalStrategy = require('passport-local').Strategy
const flaskAPI = '192.168.15.9:5000';

// load up the user model
const bcrypt = require('bcrypt');
const request = require('request-promise');

module.exports = function(passport) {

  // passport session setup ==================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.login);
  });

  // used to deserialize the user
  passport.deserializeUser(function(login, done) {
    done(null, login);
  });

  // local singup ==================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    'local-signup',
    new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    async function(req, username, password, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        var data = {
            'login': username,
            'senha': password, // use the generateHash function in our user model
            'nome': req.body.firstname,
            'sobrenome': req.body.lastname,
            'email': req.body.email
        };
        var object = {
            method: 'POST',
            uri: 'http://'+ flaskAPI +'/robo/1/register',
            body: data,
            json: true
        };
        var sendRequest = await request(object).then(function(parsedBody){
            if(parsedBody['status'] == '400'){
                return done(null);
            }
            else{
                return done(null, data);
            }
        }).catch(function(err){
            return console.log(err);
        });
    })
  );

  // local login ==================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local' 

  passport.use(
    'local-login',
    new LocalStrategy({
        // by default, local strategy uses username and password
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    async function(req, username, password, done) { // callback with username and password from our form
        var data = {
            'login': username,
            'senha': password,
        }

        var object = {
            method: 'POST',
            uri: 'http://'+ flaskAPI +'/robo/1/login',
            body: data,
            json: true
        }

        var sendRequest = await request(object).then(function(parsedBody){
            if(parsedBody['status'] === '400'){
                console.log(parsedBody)
                return done(null, false);
            }
            return done(null, data);
        }).catch(function(err){
            return console.log(err);
        });
    })
  );
  
}