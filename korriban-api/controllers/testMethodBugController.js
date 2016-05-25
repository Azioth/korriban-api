var testMethodBugController = function(Suite){

  var patch = function(req, res) {
    res.json({ "testMethodBugController": true})
  }

  return {
    patch: patch
  }
}

module.exports = testMethodBugController;
