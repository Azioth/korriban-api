var test = function(Suite){
  var testController = require('../controllers/testController.js')(Suite)

  var getTestInfo = testController.get;

  return {
    getTestInfo: getTestInfo
  }
};

module.exports = test;
