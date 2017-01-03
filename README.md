[![npm](https://img.shields.io/npm/v/cluster-socker.svg)](https://www.npmjs.com/package/cluster-socker)[![Build Status](https://travis-ci.org/happner/cluster-socket.svg?branch=master)](https://travis-ci.org/happner/cluster-socket)[![Coverage Status](https://coveralls.io/repos/github/happner/cluster-socket/badge.svg?branch=master)](https://coveralls.io/github/happner/cluster-socket?branch=master)

UNDER CONSTRUCTION

# cluster-socket

Cluster membership and replication.

`npm install cluster-socket —save`

```javascript
const Cluster = require('../');
const cluster = new Cluster({ /* options */});

cluster.join()
  .then(() => {})
  .catch(error => {});
```

```javascript
options = {
  // announceHost: '10.0.0.1',
  host: '0.0.0.0',
  port: 56000,
  seed: false,
  join: [
    '10.0.0.1:56000',
    '10.0.0.2:56000',
    '10.0.0.3:56000'
  ]
}
```

## Example

```bash
DEBUG=cluster-socket* example/00-cluster-seed
DEBUG=cluster-socket* example/01-cluster-node
# etc
```

