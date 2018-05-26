var express = require('express');
var router = express.Router();

/* GET room details. */
router.get('/:id', function(req, res, next) {
  var body = {
    "id": req.params.id
  }
  res.json(body);
});

module.exports = router;
