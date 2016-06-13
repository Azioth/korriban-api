var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var requiredStringvalidator = [
    function (val)  {
        var testVal = val.trim();
        return (testVal.length > 0)
    }, 'Field {PATH} cannot be empty'
];

var testMethods = new Schema({
  testmethod_name: {
		type: String,
		required: true,
		validate: requiredStringvalidator
	},
  testmethod_class: {
		type: String,
		required: true,
		validate: requiredStringvalidator
	},
  testmethod_result: {
		type: String,
    enum: [ 'PASS', 'FAIL', 'SKIPPED'],
		required: true
	},
  testmethod_analysis: {
		type: String,
    enum: [ 'BUG', 'ENVIRONMENT', 'IN PROGRESS', 'NOT ANALYZED', 'NO REPRO', 'SCRIPT FIX'],
		required: true
	},
  testmethod_exception: {
		type: String,
    default: ''
	},
  testmethod_ex_message: {
		type: String,
    default: ''
	},
  testmethod_duration: {
		type: Number,
		required: true
	},
  testmethod_start: {
		type: String,
		required: true
	},
  testmethod_finish: {
		type: String,
		required: true
	},
  testmethod_bug_url: {
		type: String,
    default: ''
	}
})

var suiteTest = new Schema({
  test_name: {
		type: String,
		required: true,
		validate: requiredStringvalidator
	},
  test_duration: {
		type: Number,
		required: true
	},
  test_start: {
		type: String,
		required: true
	},
  test_finish: {
		type: String,
		required: true
	},
  test_methods: {
		type: [testMethods],
		required: true
	},
});

var suiteModel = new Schema({
  suite_name: {
		type: String,
		required: true,
		validate: requiredStringvalidator
	},
  suite_start: {
		type: String,
		required: true
	},
  suite_finish: {
		type: String,
		required: true
	},
  suite_tested_url: {
		type: String,
		required: true,
		validate: requiredStringvalidator
	},
  suite_passed: {
		type: Number,
		required: true
	},
  suite_failed: {
		type: Number,
		required: true
	},
  suite_skipped: {
		type: Number,
		required: true
	},
  suite_total: {
    type: Number,
    required: true
  },
  suite_tests: {
    type: [suiteTest],
    required: true
  }
});

module.exports = mongoose.model('Suite', suiteModel);
