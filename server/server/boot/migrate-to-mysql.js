var consoleUtils = require('../utils/console.js');

module.exports = function(app) {
	var User = app.models.User;
	var Role = app.models.Role;
	var RoleMapping = app.models.RoleMapping;

	consoleUtils.separator();

	consoleUtils.log('Trying to automigrate model to database');

	app.dataSources.website.autoupdate(function (err) {
		if (err) {
			consoleUtils.error('Automigrate failed');
		} else {
			consoleUtils.log('Automigrate done');

			consoleUtils.separator();

			insertBasicEntities();
		}
	});

	consoleUtils.separator();

	function insertBasicEntities () {
		var user = {};

		consoleUtils.log('Trying to insert base entities into database');

		User.create({
			username: 'admin',
			email: 'admin@admin.com',
			password: 'admin'
		}, function(err, userInstance) {
			if (err) {
				consoleUtils.error(err.details.codes);
			} else {
				user = userInstance;
				consoleUtils.log('Successfuly created user:', userInstance);
			}
		});

		Role.create({
			name: 'admin'
		}, function(err, roleInstance) {
			if (err) {
				consoleUtils.error(err.details.codes);
			} else {
				roleInstance.principals.create({
					principalType: RoleMapping.USER,
					principalId: user.id
				}, function(err) {
					if (err) {
						consoleUtils.error(err.details.codes);
					} else {
						consoleUtils.log('Successfuly added ' + roleInstance.name + ' role to user');
					}
				});
			}
		});

		consoleUtils.separator();
	}
}