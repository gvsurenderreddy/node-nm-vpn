var ConnectionManager = require('./lib/connections.js');

var connectionManager = new ConnectionManager();

var c = connectionManager.connections;
console.log(c);

module.exports = connectionManager;

