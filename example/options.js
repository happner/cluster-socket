var path = require('path');

module.exports = function (caller) {

  var seq = path.basename(caller).split('-')[0];
  seq = parseInt(seq);

  return {
    host: 'en0',
    port: 11000 + seq,
    keyFile: __dirname + '/../server.key',
    certFile: __dirname + '/../server.cert',
    join: [
      '127.0.0.1:11000',
      '127.0.0.1:11001',
      '127.0.0.1:11002'
    ]
  };
};
