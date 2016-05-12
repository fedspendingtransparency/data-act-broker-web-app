var selenium = require('selenium-download');
selenium.ensure('./bin', function(err) {
	if(err) {
		return callback(err);
	}
});