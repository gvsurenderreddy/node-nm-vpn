/**
 * @class
 * @param {String} id Connection UUID
 * @param {String} name Connection name
 * @param {String} type Connection type (vpn, wifi, etc)
 * @param {String} device Connection device name
 */
var Connection = function (id, name, type, device) {
	this.id = id;
	this.name = name;
	this.type = type;
	this.device = device;
};

module.exports = Connection;
