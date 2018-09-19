const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const port = process.env.PORT || 3001;
const apiPath = '/api/';

//--------------------------

let profile = null;

const profileRouter = express.Router();

profileRouter.get('/', async (req, res, next) => {
    try {
        // todo: use mongo
        // const profile = await Profile.findOne({});
        // return res.send({success: true, data: profile});

        return res.send({success: true, data: profile});
    } catch (error) {
        return next(error);
    }
});

profileRouter.post('/', async (req, res, next) => {
    try {
        let newProfile = req.body.profile;
        if (!newProfile)
            throw new Error("No profile in body");

        //todo: validate newProfile
        profile = newProfile;

        return res.send({success: true, data: newProfile});
    } catch (error) {
        return next(error);
    }
});

//--------------------------

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
