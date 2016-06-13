var express = require('express');
var router = express.Router();
var Suite = require('../models/suiteModel.js');
var suites = require('./suiteRoutes.js')(Suite);
var test = require('./testRoutes.js')(Suite);
var testMethods = require('./testMethodsRoutes.js')(Suite);

/*
* Routes for suites
*/
router.get('/korriban-api/v1/suites', suites.getSuites);
router.get('/korriban-api/v1/suites/:suiteId', suites.getSuiteInfo);
router.post('/korriban-api/v1/suites/', suites.createSuite);
/*
* Routes for tests
*/
router.get('/korriban-api/v1/suites/:suiteId/tests', test.getTestInfo);
/*
* Routes for test methods
*/
router.get('/korriban-api/v1/suites/:suiteId/tests/:testId/testMethods', testMethods.getTestMethods);
router.get('/korriban-api/v1/testMethodHistory', testMethods.getHistory);
<<<<<<< HEAD
router.patch('/korriban-api/v1/testMethodStatus', testMethods.updateStatus);
router.patch('/korriban-api/v1/bugInfo', testMethods.updateBugInfo);
=======
router.get('/korriban-api/v1/testMethodStatus', testMethods.updateStatus);
router.get('/korriban-api/v1/updateBugInfo', testMethods.updateBugInfo);
>>>>>>> 24e02b13b4a2f2b8f5649a040de3caa7de74112e

module.exports = router;
