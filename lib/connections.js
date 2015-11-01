var NetworkManager = require('./nm'),
	Connection = require('./connection');

/**
 * Parses a connection line into constituent parts, assuming the following format: NAME:UUID:TYPE:DEVICE
 * @param {String{ line The connection line
 */
var parseConnectionLine = function (line) {
	lineParts = line.split(':');
	return {
		name: lineParts[0],
		uuid: lineParts[1],
		type: lineParts[2],
		device: lineParts[3]
	};
}

/**
 * @constructor
 */
var ConnectionManager = function () {
	this.nm = new NetworkManager();
}

ConnectionManager.prototype = {

	/**
         * Available connections
         * @type {Array<Connection>}
         */
        get connections () {
		var connections = this.nm.exec('-t -f "NAME, UUID, TYPE, DEVICE" connection').toString().split("\n").map(function (line) {
			var connectionDetails = parseConnectionLine(line);
			if (connectionDetails.type === 'vpn') {
				return new Connection(connectionDetails.uuid, connectionDetails.name, connectionDetails.type, connectionDetails.device);
			} else {
				return null;
			}
		}).filter(function (connection) {
			return connection;
		});
                return connections;
        },

	/**
	 * Bring a connection up
	 * @param {String} connection ID
	 */
	up: function (conId) {
		this.nm.exec('connection up ' + conId);
	},

	/**
	 * Take a connection down
	 * @param {String} connection ID
	 */
	down: function () {
		this.nm.exec('connection down ' + conId);
	}

}

module.exports = ConnectionManager;
