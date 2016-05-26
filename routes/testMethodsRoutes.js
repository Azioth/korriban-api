var testMethods = function(Suite){
  var testMethodsController = require('../controllers/testMethodsController.js')(Suite)
  var testMethodHistoryController = require('../controllers/testMethodHistoryController.js')(Suite)
  var testMethodStatusController = require('../controllers/testMethodStatusController.js')(Suite)
  var testMethodBugController = require('../controllers/testMethodBugController.js')(Suite)

  var getTestMethods = testMethodsController.get;
  var getHistory = testMethodHistoryController.get;
  var updateStatus = testMethodStatusController.patch;
  var updateBugInfo = testMethodBugController.patch;

  return {
    getTestMethods: getTestMethods,
    getHistory: getHistory,
    updateStatus: updateStatus,
    updateBugInfo: updateBugInfo
  }
};

module.exports = testMethods;
