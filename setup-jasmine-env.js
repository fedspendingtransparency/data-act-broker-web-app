jasmine.VERBOSE = true;

require('jasmine-reporters');
var reporter = new jasmine.JUnitXmlReporter("test-results/");
jasmine.getEnv().addReporter(reporter);