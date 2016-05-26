var testMethodBugController = function(Suite){

  var patch = function(req, res) {
    Suite.find({ "suite_tests.test_methods._id": req.body.testmethod_id}, function(err, suites){
      var suite = suites[0]
      suite.suite_tests[0].test_methods.forEach(function(element, index, array){
        if (element._id == req.body.testmethod_id){
          suite.suite_tests[0].test_methods[index].testmethod_analysis = "BUG";
          suite.suite_tests[0].test_methods[index].testmethod_bug_url = req.body.bug_url;
        }
      })
      suite.save(function(err){
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(204).send();
        }
      })
    })
  }

  return {
    patch: patch
  }
}

module.exports = testMethodBugController;
