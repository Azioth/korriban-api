var mongoose = require('mongoose');

var suiteController = function(Suite) {

  var get = function(req, res){
    if (mongoose.Types.ObjectId.isValid(req.params.suiteId)) {
      Suite.findById(req.params.suiteId, function(err, suite) {
        if (err) {
          res.status(500).send(err)
        } else if (suite) {
          var newSuite = {};
          var suite = suite.toJSON();
          newSuite.suite_id = suite._id;
          newSuite.suite_name = suite.suite_name;
          newSuite.suite_start = suite.suite_start;
          newSuite.suite_finish = suite.suite_finish;
          newSuite.suite_tested_url = suite.suite_tested_url;
          newSuite.suite_passed = suite.suite_passed;
          newSuite.suite_failed = suite.suite_failed;
          newSuite.suite_skipped = suite.suite_skipped;
          newSuite.suite_total = suite.suite_total;
          res.json(newSuite);
        } else {
          res.status(404).json({ "errorMessage": "No suite found with id '" + req.params.suiteId + "'." });
        }
      })
    } else {
      res.status(404).json({ "errorMessage": "Invalid format id."});
    }
  }

  var del = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.suiteId)) {
      Suite.findById(req.params.gameId, function(err, game) {
        if(err) {
            res.status(500).send(err);
        } else if (game) {
          game.remove(function (err) {
            if (err) {
              res.status(500).send(err);
            } else {
                res.status(204).send();
            }
          })
  			} else {
          res.status(404).json({ "errorMessage": "No suite found with id '" + req.params.suiteId + "'." });
        }
  		})
  	} else {
      res.status(404).json({ "errorMessage": "Invalid format id."});
    }
  }

  return {
    get: get,
    del: del
  }
}

module.exports = suiteController;
