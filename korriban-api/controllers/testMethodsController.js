var mongoose = require('mongoose');

var testMethodsController = function(Suite){

  var get = function(req,res){
    if (mongoose.Types.ObjectId.isValid(req.params.suiteId)) {
      Suite.findById(req.params.suiteId, function(err, suite) {
        if (err) {
          res.status(500).send(err)
        } else if (suite) {
          var returnTestMethods = [];
          suite.suite_tests[0].test_methods.forEach(function(element){
            var newTestMethod = {};
            var testMethodFound = element.toJSON();
            newTestMethod.testmethod_id = testMethodFound._id;
            newTestMethod.testmethod_name = testMethodFound.testmethod_name;
            newTestMethod.testmethod_class = testMethodFound.testmethod_class;
            newTestMethod.testmethod_result = testMethodFound.testmethod_result;
            newTestMethod.testmethod_analysis = testMethodFound.testmethod_analysis;
            newTestMethod.testmethod_exception = testMethodFound.testmethod_exception;
            newTestMethod.testmethod_ex_message = testMethodFound.testmethod_ex_message;
            newTestMethod.testmethod_duration = testMethodFound.testmethod_duration;
            newTestMethod.testmethod_start = testMethodFound.testmethod_start;
            newTestMethod.testmethod_finish = testMethodFound.testmethod_finish;
            newTestMethod.testmethod_bug_url = testMethodFound.testmethod_bug_url;
            returnTestMethods.push(newTestMethod);
          });
          if (returnTestMethods.length == 0) {
            res.status(404).json({ "errorMessage": "No test methods found in db for suite with id '" + req.params.suiteId + "'."})
          } else {
            res.json(returnTestMethods);
          }
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

module.exports = testMethodsController;
