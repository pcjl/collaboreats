var crypto = require('crypto');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Room = require('../models/room');

require('dotenv').load();

const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_URL = process.env.DB_URL || '';
const DB_PORT = process.env.DB_PORT || '';
const DB_NAME = process.env.DB_NAME || '';
const DB_URI = 'mongodb://' + DB_USER + ':' + DB_PASSWORD + '@' + DB_URL + ':' + DB_PORT + '/' + DB_NAME;
mongoose.connect(DB_URI, {}).then(
    () => {},
    err => {
        console.log('Error connecting to database');
    }
);

/* POST room. */
router.post('/', function (req, res, next) {
    var id = crypto.randomBytes(10).toString('hex');

    // Create a new room
    var room = new Room({
        'name': id
    });

    room.save(function (err) {
        if (err) {
            res.json({
                'success': false,
                'error': 'Error creating room'
            });
        }

        res.json({
            'success': true,
            'name': id
        });
    });
});

/* GET room details. */
router.get('/:id', function (req, res, next) {
    var id = req.params.id;

    // Find room by id
    Room.findOne({
        'name': id
    }, '-_id name restaurants', function (err, room) {
        if (err) {
            res.json({
                'success': false,
                'error': 'Error retrieving room'
            });
        }

        if (room == null) {
            res.json({
                'success': false,
                'error': 'Room does not exist'
            });
        }

        res.json({
            "success": true,
            "room": room
        });
    });
});

/* PUT room details. */
router.put('/:id', function (req, res, next) {
    /*
        req:
        {
            restaurant: "IL_lajLYPfw8kYWuy5MK8A",
            vote: "Patrick",
            unvote: false
        }
    */
    var id = req.params.id;

    var restaurant_name = req.body['restaurant'];
    var vote_name = req.body['vote'];
    var unvote = req.body['unvote'];

    // Find room by id
    Room.findOne({
        'name': id,
    }, '-_id name restaurants', function (err, room) {
        if (err) {
            res.json({
                'success': false,
                'error': 'Error retrieving room'
            });
            return;
        }

        if (room == null) {
            res.json({
                'success': false,
                'error': 'Room does not exist'
            });
        }

        Room.findOne({
            'name': id,
            'restaurants.name': {
                $in: [restaurant_name]
            }
        }, '-_id name restaurants', function (err, room) {
            if (err) {
                res.json({
                    'success': false,
                    'error': 'Error retrieving room'
                });
            }

            if (room == null) {
                Room.findOneAndUpdate({
                    'name': id
                }, {
                    $push: {
                        restaurants: {
                            name: restaurant_name,
                            votes: [vote_name]
                        }
                    }
                }, function (err, room) {
                    if (err) {
                        res.json({
                            'success': false,
                            'error': 'Error submitting vote1'
                        });
                    }

                    res.json({
                        'success': true
                    });
                });
            } else {
                var restaurants = room['restaurants'];

                Room.findOne({
                    'name': id,
                    'restaurants': {
                        $elemMatch: {
                            'name': {
                                $in: [restaurant_name]
                            },
                            'votes': {
                                $in: [vote_name]
                            }
                        }
                    }
                }, '-_id name restaurants', function (err, room) {
                    if (err) {
                        res.json({
                            'success': false,
                            'error': 'Error submitting vote2'
                        });
                    }

                    var voted = room != null;

                    var i;
                    for (i = 0; i < restaurants.length; i++) {
                        if (restaurants[i]['name'] == restaurant_name) {
                            break;
                        }
                    }

                    var votesParamKey = 'restaurants.' + i + '.votes';
                    var votesParam = {};
                    votesParam[votesParamKey] = vote_name;

                    if (voted && unvote) {
                        Room.findOneAndUpdate({
                            'name': id,
                            'restaurants': {
                                $elemMatch: {
                                    'name': {
                                        $in: [restaurant_name]
                                    },
                                    'votes': {
                                        $in: [vote_name]
                                    }
                                }
                            }
                        }, {
                            $pull: votesParam
                        }, function (err, room) {
                            if (err) {
                                res.json({
                                    'success': false,
                                    'error': 'Error removing vote'
                                });
                                console.log(err);
                            }

                            res.json({
                                'success': true
                            });
                        });
                    } else if (!voted && !unvote) {
                        Room.findOneAndUpdate({
                            'name': id,
                            'restaurants': {
                                $elemMatch: {
                                    'name': {
                                        $in: [restaurant_name]
                                    }
                                }
                            }
                        }, {
                            $push: votesParam
                        }, function (err, room) {
                            if (err) {
                                res.json({
                                    'success': false,
                                    'error': 'Error submitting vote3'
                                });
                            }

                            res.json({
                                'success': true
                            });
                        });
                    } else {
                        res.json({
                            'success': true
                        });
                    }
                });
            }
        });
    });
});

module.exports = router;