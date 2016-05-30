var suites = function (Suite) {
  var suitesController = require('../controllers/suitesController.js')(Suite)
  var suiteController = require('../controllers/suiteController.js')(Suite)

  var getSuites = suitesController.get;
  var getSuiteInfo = suiteController.get;
  var createSuite = suitesController.post;
  var deleteSuite = suiteController.del;

  return {
    getSuites,
    getSuiteInfo,
    createSuite,
    deleteSuite
  }
};

module.exports = suites;
