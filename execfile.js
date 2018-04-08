// For importing non-Node.js Javascript into Node.js
var vm = require("vm");
var fs = require("fs");
module.exports = function(path, context) {
  context = context || {};
  var data = fs.readFileSync(path);
  vm.runInNewContext(data, context, path);
  return context;
};
// Usage hints:
// > var execfile = require("execfile");
// > // `someGlobal` will be a global variable while the script runs
// > var context = execfile("example.js", { someGlobal: 42 });
