var express = require('express');
var router = express.Router();
var Room = require('../models/room');

/* GET room details. */
router.get('/:id', function (req, res, next) {
    id = req.params.id;

    // Room.find().byName(id).exec(function (err, rooms) {
    //     console.log(rooms);
    // });

    var body = {
        "id": id
    }
    res.json(body);
});

router.post('/:id', function (req, res, next) {
    id = req.params.id;
});

router.put('/:id', function (req, res, next) {
    id = req.params.id;
});

module.exports = router;
