var filename = require('path').basename(__filename);
var expect = require('expect.js');
var Promise = require('bluebird');


var Cluster = require('../');

describe(filename, function () {

  var cluster;

  afterEach('stop cluster', function () {
    return cluster.stop();
  });

  context('seed', function () {

    var options;

    beforeEach(function () {
      options = {
        seed: true,
        host: '127.0.0.1',
        port: 44000,
        join: [
          '127.0.0.1:44000',
          '127.0.0.1:44001',
          '127.0.0.1:44002'
        ]
      };
    });

    it('listens with defaults', function (done) {
      delete options.host;
      delete options.port;
      cluster = new Cluster(options);
      cluster.join()
        .then(function () {
          expect(cluster._server.address()).to.eql({
            address: '0.0.0.0',
            family: 'IPv4',
            port: 56000
          })
        })
        .then(done).catch(done);
    });

    it('listens with specified', function (done) {
      cluster = new Cluster(options);
      cluster.join()
        .then(function () {
          expect(cluster._server.address()).to.eql({
            address: '127.0.0.1',
            family: 'IPv4',
            port: 44000
          })
        })
        .then(done).catch(done);
    });

    it('attempts to join the cluster', function (done) {
      cluster = new Cluster(options);
      var tried = [];
      cluster._connectJoinEach = function (address) {
        tried.push(address);
        return Promise.reject(new Error('x'));
      };

      cluster.join()
        .then(function () {
          expect(tried).to.eql(['127.0.0.1:44001', '127.0.0.1:44002']);
        })
        .then(done).catch(done);
    });

    it('seeds the cluster', function (done) {
      cluster = new Cluster(options);
      cluster._doSeed = function() {
        done();
      };
      cluster.join();
    });

  });

  context('join', function () {

    it('x');

  });

});
