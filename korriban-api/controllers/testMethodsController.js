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
            var testMethod = element.toJSON();
            newTestMethod.testmethod_id = testMethod._id;
            newTestMethod.testmethod_name = testMethod.testmethod_name;
            newTestMethod.testmethod_class = testMethod.testmethod_class;
            newTestMethod.testmethod_result = testMethod.testmethod_result;
            newTestMethod.testmethod_analysis = testMethod.testmethod_analysis;
            newTestMethod.testmethod_exception = testMethod.testmethod_exception;
            newTestMethod.testmethod_ex_message = testMethod.testmethod_ex_message;
            newTestMethod.testmethod_duration = testMethod.testmethod_duration;
            newTestMethod.testmethod_start = testMethod.testmethod_start;
            newTestMethod.testmethod_finish = testMethod.testmethod_finish;
            newTestMethod.testmethod_bug_url = testMethod.testmethod_bug_url;
            returnTestMethods.push(newTestMethod);
          });
          if (returnTestMethods) {
            res.json(returnTestMethods);
          } else {
            res.status(500).json({ "errorMessage": "No test methods found in db for suite with id '" + req.params.suiteId + "'."})
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
