var testMethodHistoryController = function(Suite){

  var get = function(req, res){
    var query = {};
    if (req.query.class){
      var className = req.query.class;
      if (req.query.method){
        var methodName = req.query.method;
        if (req.query.environment) {
          var validEnvironment = false;
          switch(req.query.environment) {
              case "QA":
                query.suite_tested_url = "https://qamgmt01.indemandterp.com/"
                validEnvironment = true;
                break;
              case "STG":
                query.suite_tested_url = "https://vdsstage01.indemandterp.com/"
                validEnvironment = true;
                break;
          }
          if (validEnvironment){
            Suite.find(query, function(err, suite){
              if (err){
                res.status(500).send(err);
              } else {
                var returnHistory = [];
                suite.forEach(function(element){
                  var testMethods = element.suite_tests[0].test_methods
                  testMethods.forEach(function(element){
                    if (element.testmethod_class == className){
                      if (element.testmethod_name == methodName){
                        var newTestMethod = {}
                        var testMethodFound = element.toJSON()
                        newTestMethod.testmethod_id = testMethodFound._id;
                        newTestMethod.testmethod_name = testMethodFound.testmethod_name;
                        newTestMethod.testmethod_class = testMethodFound.testmethod_class;
                        newTestMethod.testmethod_result = testMethodFound.testmethod_result;
                        newTestMethod.testmethod_analysis = testMethodFound.testmethod_analysis;
                        newTestMethod.testmethod_exception = testMethodFound.testmethod_exception;
                        newTestMethod.testmethod_ex_message = testMethodFound.testmethod_ex_message;
                        newTestMethod.testmethod_duration = testMethodFound.testmethod_duration
                        newTestMethod.testmethod_start = testMethodFound.testmethod_start;
                        newTestMethod.testmethod_finish = testMethodFound.testmethod_finish;
                        newTestMethod.testmethod_bug_url = testMethodFound.testmethod_bug_url;
                        returnHistory.push(newTestMethod);
                      }
                    }
                  })
                })
                if (returnHistory.length == 0){
                  res.status(404).json({ "errorMessage": "No history found for test method '" + className + "." + methodName + "()' for [" + req.query.environment + "] environment."})
                } else {
                  res.json(returnHistory);
                }
              }
            })
          } else {
              res.status(400).json({ "errorMessage": "Invalid Environment value '" + req.query.environment + "'. It must be either [QA] or [STG]."})
          }
        } else {
          res.status(400).json({ "errorMessage": "Environment query parameter cannot be null."})
        }
      } else {
        res.status(400).json({ "errorMessage": "Method query parameter cannot be null."})
      }
    } else {
      res.status(400).json({ "errorMessage": "Class query parameter cannot be null."})
    }
  }

  return {
    get: get
  }
}

module.exports = testMethodHistoryController;
