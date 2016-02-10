Package.describe({
	name: 'convexset:glpk',
	version: '0.0.2',
	summary: 'GLPK.js wrapped for Meteor',
	git: 'https://github.com/convexset/meteor-glpk',
	documentation: '../../README.md'
});


Package.onUse(function(api) {
	api.versionsFrom('1.2.1');

	api.use(
		[
			'ecmascript', 'underscore', 'check', 'ejson',
			'convexset:package-utils@0.1.9',
		]
	);
	api.use([], 'server');
	api.use([], 'client');

	api.addAssets([
		'glpk.min.js',
		'solve.js',
		'sol-tools.js',
	], ["client", "server"]);

	api.addFiles('constants.js');
	api.addFiles('front-end.js');

	api.export('GLPK');
});


Package.onTest(function(api) {
	api.use(['tinytest', 'ecmascript', 'underscore', 'ejson', ]);
	api.use('convexset:glpk');
	api.addFiles(['tests.js', ]);
	api.addFiles([], 'server');
	api.addFiles([], 'client');
});