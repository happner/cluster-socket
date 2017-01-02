module.exports = Cluster;

var net = require('net');
var tls = require('tls');
var fs = require('fs');
var Promise = require('bluebird');
var dface = require('dface');
var clone = require('clone');

var haveAddress = require('./have-address');

function Cluster(opts, logger) {
  this.opts = opts = opts || {};
  this.log = logger || require('./logger');
  this._members = {};
  this._defaults(opts);
}

Cluster.prototype.join = function () {
  var _this = this;
  return Promise.resolve()
    .then(_this._listen.bind(_this))
    .then(_this._connect.bind(_this))
};

Cluster.prototype.stop = function () {
  var _this = this;
  return new Promise(function (resolve, reject) {
    if (!_this._server) return resolve();
    _this._server.close();
    console.log('close sockets');
    resolve();
  });
};

Cluster.prototype._listen = function () {
  var _this = this;
  return new Promise(function (resolve, reject) {
    _this._server = _this._transport.createServer(_this.opts);

    function onError(error) {
      _this._server.removeListener('listening', onListening);
      reject(error);
    }

    function onListening() {
      var address = _this._server.address();
      _this._server.removeListener('error', onError);
      _this.log.info('listening %s:%d', address.address, address.port);
      resolve();
    }

    _this._server.once('error', onError);
    _this._server.once('listening', onListening);
    _this._server.listen(_this.opts.port, _this.opts.host);
  });
};

Cluster.prototype._connect = function () {
  var _this = this;
  var joinList = this._removeLocalAddress(_this.opts.join);
  return new Promise(function (resolve, reject) {
    
    console.log('JOIN', joinList);

    resolve();
  });
};

Cluster.prototype._defaults = function(opts) {
  Object.defineProperty(this, '_transport', {
    get: function () {
      if (opts.keyFile) {
        Object.defineProperty(opts, 'key', {
          value: fs.readFileSync(opts.keyFile)
        });
        Object.defineProperty(opts, 'cert', {
          value: fs.readFileSync(opts.certFile)
        });
        return tls;
      }
      return net;
    }
  });

  opts.port = typeof opts.port == 'number' ? opts.port : 56000;
  opts.host = dface(opts.host) || '0.0.0.0';
};

Cluster.prototype._removeLocalAddress = function () {
  // don't joint to self
  var _this = this;
  var joinList = clone(this.opts.join);
  joinList.forEach(function (address) {
    var split = address.split(':');
    var port = parseInt(split[1]);
    var host = split[0];

    if (port !== _this.opts.port) return;
    if (!haveAddress(host)) {
      // also remove self as accessible via docker mapping
      if (!_this.opts.announceHost) return;
      if (_this.opts.announceHost != host) return;
    }

    joinList.splice(joinList.indexOf(address), 1);
  });
  return joinList;
};
