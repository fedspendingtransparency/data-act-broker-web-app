jasmine.VERBOSE = true;

require('jasmine-reporters');
var reporter = new jasmine.JUnitXmlReporter("__tests__/test-results/");
jasmine.getEnv().addReporter(reporter);