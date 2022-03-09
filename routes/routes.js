const request = require('request-promise');

var robots = null;

async function all_robots(){
    var object = {
      uri: 'http://192.168.15.9:5000/robos',
      json: true // Automatically parses the JSON string in the response
    };

    var data = await request(object).then(function(parsedBody){
        console.log(parsedBody)
        robots = parsedBody;
    }).catch(function(err){
      return console.log(err);
    });
  } 
  all_robots();


module.exports = function(app, passport) {
    
    // home page (with login) ==================================================
    app.get('/', (req, res) => {
        res.render('home', { message: req.flash('loginMessage') });
    });

    app.post('/', passport.authenticate('local-login', {
        successRedirect: '/mainMenu',
        failureRedirect: '/',
        failureFlash: true
            }),
        function(req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        }
    );

    // singup ==================================================
    app.get('/register', (req, res) => {
        res.render('users/register', { message: req.flash('signupMessage') });
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/', 
		failureRedirect : '/register', 
		failureFlash : true 
    }));

    // main menu ==================================================
    app.get('/mainMenu', checkAuthenticated, (req, res) => {
        res.render('mainMenu', {
            user : req.user, // get the user out of session and pass to template
            robots: robots
        });
    });

    app.get('/logout', (req, res) => {
        req.session.destroy()
        req.logOut()
        res.redirect('/')
    });


    //middlewares ==================================================
    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/');
    };
}