module.exports = function(app, passport) {
    
    // home page (with login) ==================================================
    app.get('/', (req, res) => {
        res.render('home', { message: req.flash('loginMessage') });
    });

    app.post('/', passport.authenticate('local', {
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
            user : req.user // get the user out of session and pass to template
        });
    });

    app.delete('/logout', (req, res) => {
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