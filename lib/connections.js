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
	 * The currently active connection
	 * @type {Connection}
	 */
	get active () {
		var active = this.connections.filter(function (con) {
			return con.up;
		}).pop();
		return typeof active !== 'undefined' ? active : null;
	},

	/**
	 * Set the active connection, bringing down the previously active connection
	 * @param {Connection} con
	 */
	setActive: function (con) {
		if (this.active) this.active.down();
		this.up(con.id);
	},

	/**
	 * Get connection for the given UUID
	 * @param {String} connection UUID
	 * @return {Connection|null}
	 */
	getById: function (id) {
		return this.connections.filter(function (con) {
			return con.id === id;
		}).pop() || null;
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
	down: function (conId) {
		this.nm.exec('connection down ' + conId);
	}

}

module.exports = ConnectionManager;
