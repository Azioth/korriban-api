var testMethodStatusController = function(Suite){

  var patch = function(req, res) {
    res.json({ "testMethodStatusController": true})
  }

  return {
    patch: patch
  }
}

module.exports = testMethodStatusController;
