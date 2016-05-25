var suitesController = function(Suite) {

  var get = function(req, res) {
    var query = {};

    Suite.find(query, function(err, suites) {
      if (err) {
        res.status(500).send(err);
      } else {
        var returnSuites = [];
        suites.forEach(function(element, index, array) {
          var newSuite = {};
          var suite = element.toJSON();
          newSuite.suite_id = suite._id;
          newSuite.suite_name = suite.suite_name;
          newSuite.suite_start = suite.suite_start;
          newSuite.suite_finish = suite.suite_finish;
          newSuite.suite_tested_url = suite.suite_tested_url;
          newSuite.suite_passed = suite.suite_passed;
          newSuite.suite_failed = suite.suite_failed;
          newSuite.suite_skipped = suite.suite_skipped;
          newSuite.suite_total = suite.suite_total;
          returnSuites.push(newSuite);
        });
        if (returnSuites) {
          res.json(returnSuites);
        } else {
          res.status(500).json({ "errorMessage": "No test methods found in db" })
        }

      }
    })
  }

  var post = function(req, res) {
    var suite = new Suite(req.body);
    suite.save(function(err){
      if (err) {
        res.status(400).json(err);
      }
    });
  }

  return {
    get: get,
    post: post
  }
}

module.exports = suitesController;
