// Testacular configuration
// Generated on Wed Jan 23 2013 13:03:48 GMT+0900 (JST)


// base path, that will be used to resolve files and exclude
basePath = './';


// list of files / patterns to load in the browser
files = [
	JASMINE,
	JASMINE_ADAPTER,
	'http://www.google.com/jsapi',
	'src/main/webapp/scripts/libs/jquery/jquery.js',
	'src/main/webapp/scripts/libs/jquery/jquery-ui.js',
	'src/main/webapp/scripts/libs/fullcalendar/fullcalendar.js',
	'src/main/webapp/scripts/libs/fullcalendar/gcal.js',
	'src/main/webapp/scripts/libs/angular/angular.js',
	'src/main/webapp/scripts/libs/angular-ui-calendar/calendar.js',
//	'src/main/webapp/scripts/**/*.js',

	'src/test/typescripts/libs/sinon/sinon.js',
	'src/test/typescripts/libs/sinon/lib/spy.js',
	'src/test/typescripts/libs/sinon/lib/spy.js',
	'src/test/typescripts/libs/sinon/lib/assert.js',
	'src/test/typescripts/libs/sinon/lib/collection.js',
	'src/test/typescripts/libs/sinon/lib/match.js',
	'src/test/typescripts/libs/sinon/lib/mock.js',
	'src/test/typescripts/libs/sinon/lib/sandbox.js',
	'src/test/typescripts/libs/sinon/lib/stub.js',
	'src/test/typescripts/libs/sinon/lib/test.js',
	'src/test/typescripts/libs/sinon/lib/test_case.js',

	'src/test/typescripts/libs/sinon/lib/util/event.js',
	'src/test/typescripts/libs/sinon/lib/util/fake_server.js',
	'src/test/typescripts/libs/sinon/lib/util/fake_server_with_clock.js',
	'src/test/typescripts/libs/sinon/lib/util/fake_timers.js',
	'src/test/typescripts/libs/sinon/lib/util/fake_xml_http_request.js',
	'src/test/typescripts/libs/sinon/lib/util/timers_ie.js',
	'src/test/typescripts/libs/sinon/lib/util/xhr_ie.js',

	'src/test/typescripts/libs/jasmine-sinon/jasmine-sinon.js',

	'src/test/typescripts/libs/angular/angular-mocks.js',
	'src/test/typescripts/*-spec.js'
];


// list of files to exclude
exclude = [
	'src/main/webapp/scripts/libs/jquery/jquery-migrate.js',
	'src/main/webapp/scripts/main.min.js'
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress', 'junit'];


// web server port
port = 8080;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome', 'PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
