/**
 * @class NetworkManager CLI wrapper
 */

var execSync = require('child_process').execSync;

var NetworkManager = function () {
	var res = execSync('nmcli -v');
	console.log(res.toString());
};

NetworkManager.prototype = {

	/**
	 * Executes an nm-cli command
	 * @param {String} command to execute
	 * @return {String} result of command
	 */
	exec: function (cmd) {
		var res = execSync('nmcli ' + cmd);
		return res;
	}

}

module.exports = NetworkManager;
