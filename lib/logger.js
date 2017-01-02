var util = require('util');

module.exports = {
  fatal: function () {
    console.log(util.format.apply(util, arguments));
  },
  error: function () {
    console.log(util.format.apply(util, arguments));
  },
  warn: function () {
    console.log(util.format.apply(util, arguments));
  },
  info: function () {
    console.log(util.format.apply(util, arguments));
  },
  debug: function () {
    console.log(util.format.apply(util, arguments));
  },
  trace: function () {
    console.log(util.format.apply(util, arguments));
  }
};
