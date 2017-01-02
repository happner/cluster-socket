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
      options.host = '127.0.0.1';
      options.port = 44000;
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

      options.announceHost = '10.0.0.10';
      options.host = '127.0.0.1';
      options.port = 44000;
      options.join = [
        '127.0.0.1:44000',
        '127.0.0.1:44001',
        '127.0.0.1:44002'
      ];
      cluster = new Cluster(options);
      cluster.join()
        .then(function () {

        })
        .then(done).catch(done);
    });

  });

  context('join', function () {

  });

});
