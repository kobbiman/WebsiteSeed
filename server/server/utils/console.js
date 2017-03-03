'use strict';

module.exports = {
	separator: function () {
		console.log('   ');
		console.log('====================================================');
		console.log('   ');
	},
	error: function (message) {
		console.error(message);
	},
	success: function (message) {
		console.log(message);
	},
	log: function (message) {
		console.log(message);
	}
};