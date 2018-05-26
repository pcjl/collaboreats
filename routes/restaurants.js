var express = require('express');
var request = require('request');
var router = express.Router();

require('dotenv').load();

const TOKEN = process.env.YELP_TOKEN || '';
/* GET restaurants. */
router.get('/', function (req, res, next) {
    /*
        req:
        {
            "term": "Lazeez",
            "latitude": 43.4761259,
            "longitude": -80.53880979999997
        }
    */
    request.get('https://api.yelp.com/v3/businesses/search', {
        qs: req.body,
        headers: {
            'Authorization': 'Bearer ' + TOKEN
        }
    }, function (err, resp, body) {
        if (err) {
            console.error("Error: ", err);
        }
        res.json(JSON.parse(body));
    });
});

module.exports = router;