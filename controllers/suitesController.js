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
          var suiteFound = element.toJSON();
          newSuite.suite_id = suiteFound._id;
          newSuite.suite_name = suiteFound.suite_name;
          newSuite.suite_start = suiteFound.suite_start;
          newSuite.suite_finish = suiteFound.suite_finish;
          newSuite.suite_tested_url = suiteFound.suite_tested_url;
          newSuite.suite_passed = suiteFound.suite_passed;
          newSuite.suite_failed = suiteFound.suite_failed;
          newSuite.suite_skipped = suiteFound.suite_skipped;
          newSuite.suite_total = suiteFound.suite_total;
          returnSuites.push(newSuite);
        });
        if (returnSuites.length == 0) {
          res.status(404).json({ "errorMessage": "No test suites found in db" })
        } else {
          res.json(returnSuites);
        }

      }
    })
  }

  var post = function(req, res) {
    var suite = new Suite(req.body);
    suite.save(function(err){
      if (err) {
        res.status(400).json(err);
<<<<<<< HEAD
      } else {
        res.status(201).set('Content-Location', 'http://' + req.headers.host + '/korriban-api/v1/suites/' + suite._id).send();
=======
>>>>>>> 24e02b13b4a2f2b8f5649a040de3caa7de74112e
      }
    });
  }

  return {
    get: get,
    post: post
  }
}

module.exports = suitesController;
