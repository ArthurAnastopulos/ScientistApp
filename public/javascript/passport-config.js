const LocalStrategy = require('passport-local').Strategy

// load up the user model
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const dbconfig = require('./database');
const connection =  mysql.createPool(dbconfig.connection);

//connection.connect();
connection.query('USE ' + dbconfig.database);
//connection.end();

module.exports = function(passport) {

  // passport session setup ==================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    // console.log("serializeUser" + user.id)
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    //connection.connect();
    console.log("deserializeUser" + id)
    connection.query("SELECT * FROM " + dbconfig.users_table +" WHERE id = ?", [id], function(err, rows){
        // console.log(rows)
        done(err, rows[0]);
    });
    //connection.end();
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
    function(req, username, password, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        //connection.connect();
        connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE username = ? ", [username], function(err, rows) {
            if (err)
                return done(err);
            if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
                // if there is no user with that username
                // create the user
                var newUserMysql = {
                    id: Date.now().toString(),
                    username: username,
                    password: bcrypt.hashSync(password, 10),  // use the generateHash function in our user model
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email
                };

                var insertQuery = "INSERT INTO users ( id, username, password, firstname, lastname, email ) values (?,?,?,?,?,?) ";
                //connection.connect();
                connection.query(insertQuery, [newUserMysql.id, newUserMysql.username, newUserMysql.password, newUserMysql.firstname, newUserMysql.lastname, newUserMysql.email], function(err, rows) {
                    if (err) {
                        return console.error(err.message);
                    }
                    // console.log("Query"+rows)
                    // console.log("newUserMysql"+JSON.stringify(newUserMysql))
                    return done(null, newUserMysql);
                });
                //connection.end();
            }
        });
        //connection.end();
    })
  );

  // local login ==================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local' 

  passport.use(
    'local-login',
    new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form
        //connection.connect();
        connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE username = ?", [username], function(err, rows){
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            const hash = bcrypt.hashSync(password, 10);
            if (!bcrypt.compareSync(password, hash))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, rows[0]);
        });
        //connection.end();
    })
  );
  
}