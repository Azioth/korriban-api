var mongoose = require('mongoose');

var testsController = function(Suite){

  var get = function(req,res){
    if (mongoose.Types.ObjectId.isValid(req.params.suiteId)) {
      Suite.findById(req.params.suiteId, function(err, suite) {
        if (err) {
          res.status(500).send(err)
        } else if (suite) {
          var newTest = {};
          var suiteFound =  suite.toJSON();
          newTest.test_id = suiteFound.suite_tests[0]._id;
          newTest.test_name = suiteFound.suite_tests[0].test_name;
          newTest.test_duration = suiteFound.suite_tests[0].test_duration;
          newTest.test_start = suiteFound.suite_tests[0].test_start;
          newTest.test_finish = suiteFound.suite_tests[0].test_finish;
          res.json(newTest);
        } else {
          res.status(404).json({ "errorMessage": "No test found for suite with id '" + req.params.suiteId + "'." })
        }
      })
    } else {
      res.status(404).json({ "errorMessage": "Invalid format id."})
    }
  }

  return {
    get: get
  }

}

module.exports = testsController;
