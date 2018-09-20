const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const {mongoose} = require('./db/connect');
const profileRouter = require('./router/profile');

const apiPath = '/api/';
const port = process.env.PORT || 3001;

const enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token, x-round');

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('../public')); //react app
app.use(logger('dev'));
app.use(enableCORS);

app.use(apiPath + 'profile', profileRouter);

//api 404
app.use(apiPath + '*', function(req, res, next) {
    res.status(404);
    res.json({"success": false, "error": "404"});
});

//api error handler
app.use(apiPath + '*', function(err, req, res, next) {
    if (err) {
        console.error(err);
        let errorText = err.message;
        res.status(500)
        res.json({success: false, error: errorText})
    } else {
        next()
    }
});

app.listen(port);
console.log(`Listening port ${port}`);
