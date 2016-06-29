 var mongoose = require('mongoose');

var suiteController = function(Suite) {

  var get = function(req, res){
    if (mongoose.Types.ObjectId.isValid(req.params.suiteId)) {
      Suite.findById(req.params.suiteId, function(err, suite) {
        if (err) {
          res.status(500).send(err)
        } else if (suite) {
          var newSuite = {};
          var suiteFound = suite.toJSON();
          newSuite.suite_id = suiteFound._id;
          newSuite.suite_name = suiteFound.suite_name;
          newSuite.suite_start = suiteFound.suite_start;
          newSuite.suite_finish = suiteFound.suite_finish;
          newSuite.suite_tested_url = suiteFound.suite_tested_url;
          newSuite.suite_passed = suiteFound.suite_passed;
          newSuite.suite_failed = suiteFound.suite_failed;
          newSuite.suite_skipped = suiteFound.suite_skipped;
          newSuite.suite_total = suiteFound.suite_total;
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
