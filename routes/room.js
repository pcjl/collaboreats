var crypto = require('crypto');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Room = require('../models/room');
var Vote = require('../models/vote');


require('dotenv').load();

const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_URI = 'mongodb://' + DB_USER + ':' + DB_PASSWORD + '@ds135810.mlab.com:35810/collaboreats';

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
        name: id
    });

    room.save(function (err) {
        if (err) {
            res.json({
                "success": false,
                "error": "Error creating room"
            });
            return;
        }

        res.json({
            "success": true
        });
    });
});

/* GET room details. */
router.get('/:id', function (req, res, next) {
    var id = req.params.id;

    // Find room by id
    Room.find({
        name: id
    }, '-_id name restaurants', function (err, rooms) {
        if (err) {
            res.json({
                "success": false,
                "error": "Error retrieving room"
            });
            return;
        }

        if (rooms.length === 0) {
            res.json({
                "success": false,
                "error": "Room does not exist"
            });
            return;
        }

        res.json({
            "success": true,
            "room": rooms[0]
        });
    });
});

/* PUT room details. */
router.put('/:id', function (req, res, next) {
    /*
        req:
        {
            restaurant: "IL_lajLYPfw8kYWuy5MK8A",
            name: "Patrick",
            delete: false
        }
    */
    var id = req.params.id;

    // Find room by id
    Room.find({
        name: id
    }, '-_id name restaurants', function (err, rooms) {
        if (err) {
            res.json({
                "success": false,
                "error": "Error retrieving room"
            });
            return;
        }

        if (rooms.length === 0) {
            res.json({
                "success": false,
                "error": "Room does not exist"
            });
            return;
        }

        res.json({
            "success": true,
            "room": rooms[0]
        });
    });
});

module.exports = router;