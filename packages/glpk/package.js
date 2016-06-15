Package.describe({
	name: 'convexset:glpk',
	version: '0.0.3_3',
	summary: 'GLPK.js wrapped for Meteor',
	git: 'https://github.com/convexset/meteor-glpk',
	documentation: '../../README.md'
});


Package.onUse(function(api) {
	api.versionsFrom('1.3.1');

	api.use(
		[
			'ecmascript', 'check', 'ejson',
			'tmeasday:check-npm-versions@0.3.1'
		]
	);
	api.use([], 'server');
	api.use([], 'client');

	// api.addAssets([
	// 	'extras/glpk.js',
	// 	'extras/glpk.min.js',
	// ], ["client", "server"]);

	api.addAssets([
		'glpk.min.js',
	], ["client", "server"]);

	api.addAssets([
		'array.includes.js',
		'solve.js',
		'sol-tools.js',
	], ["client", "server"]);

	api.addFiles('array.includes.js');
	api.addFiles('constants.js');
	api.addFiles('front-end.js');

	api.export('GLPK');
});


Package.onTest(function(api) {
	api.use(['tinytest', 'ecmascript', 'ejson', ]);
	api.use('convexset:glpk');
	api.addFiles(['tests.js', ]);
	api.addFiles([], 'server');
	api.addFiles([], 'client');
});