var os = require('os');
var addressList;

function getAddresses() {
  var addresses = os.networkInterfaces();
  Object.keys(addresses).forEach(function (iface) {
    var interface = addresses[iface];
    interface.forEach(function (address) {
      addressList = addressList || [];
      addressList.push(address.address);
    });
  });
}

module.exports = function (address) {
  var addresses = addressList || getAddresses();
  return addressList.indexOf(address) >= 0
};
