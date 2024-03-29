const express = require('express');
const app = express();
const session = require('express-session');
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
app.use('/public', static);
app.use('/favicon.ico', express.static('public/assets/favicon.ico'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // read request body from a form

//Changed default layout to false b/c main was showing twice
app.engine('handlebars', exphbs({ defaultLayout: false }));
app.set('view engine', 'handlebars');


// Added this express session cookie to check if user is logged in or not
app.use(session({
    name: 'AuthCookie',
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use('*', (req, res, next) => {
    if (req.originalUrl === "/private") {
        next();
    }
    let authenticated = " (Non-Authenticated User)";
    if (req.session && req.session.user) {
        authenticated = " (Authenticated User)";
    }
    console.log("[" + (new Date().toUTCString()) + "] " + req.method + " " + req.originalUrl + authenticated);
    next();
});


app.use('/private', (req, res, next) => {
    let authenticated = " (Non-Authenticated User)";
    if (req.session && req.session.user) {
        authenticated = " (Authenticated User)";
    }
    console.log("[" + (new Date().toUTCString()) + "] " + req.method + " " + req.originalUrl + authenticated);
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(403).redirect("/");
    }
});

app.use('/userinfo', (req, res, next) => {
    let authenticated = " (Non-Authenticated User)";
    if (req.session && req.session.user) {
        authenticated = " (Authenticated User)";
    }
    console.log("[" + (new Date().toUTCString()) + "] " + req.method + " " + req.originalUrl + authenticated);
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(403).redirect("/");
    }
});

configRoutes(app);

app.listen(3000, () => {
    console.log('Routes are running on http://localhost:3000');
});