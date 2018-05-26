var express = require('express');
var request = require('request');
var router = express.Router();

require('dotenv').load();

const YELP_TOKEN = process.env.YELP_TOKEN || '';

/* GET search. */
router.get('/', function (req, res, next) {
    /*
        {
            "term": "Lazeez",
            "latitude": 43.4761259,
            "longitude": -80.53880979999997
        }
    */
    request.get('https://api.yelp.com/v3/businesses/search', {
        qs: req.body,
        headers: {
            'Authorization': 'Bearer ' + YELP_TOKEN
        }
    }, function (err, resp, body) {
        if (err) {
            res.json({
                "success": false,
                "error": "Yelp error"
            });
            return;
        }
        res.json(JSON.parse(body));
    });
});

/* GET search autocomplete. */
router.get('/autocomplete', function (req, res, next) {
    /*
        {
            "text": "Lazeez",
            "latitude": 43.4761259,
            "longitude": -80.53880979999997
        }
    */
    request.get('https://api.yelp.com/v3/autocomplete', {
        qs: req.body,
        headers: {
            'Authorization': 'Bearer ' + YELP_TOKEN
        }
    }, function (err, resp, body) {
        if (err) {
            res.json({
                "success": false,
                "error": "Yelp error"
            });
            return;
        }
        res.json(JSON.parse(body));
    });
});

router.get('/ids', function (req, res, next) {
    /*
        {
            "restaurants": ["IL_lajLYPfw8kYWuy5MK8A"]
        }
    */
    var restaurants = req.body["restaurants"];
    var restaurantDetails = [];
    var count = restaurants.length;

    restaurants.forEach(function (id) {
        console.log('https://api.yelp.com/v3/businesses/' + id);
        request.get('https://api.yelp.com/v3/businesses/' + id, {
            headers: {
                'Authorization': 'Bearer ' + YELP_TOKEN
            }
        }, function (err, resp, body) {
            if (err) {
                res.json({
                    "success": false,
                    "error": "Yelp error"
                });
                return;
            }

            restaurantDetails.push(JSON.parse(body));
            count--;
            if (count === 0) {
                res.json({
                    "businesses": restaurantDetails
                });
            }
        });
    });
});

module.exports = router;
