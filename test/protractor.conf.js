exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./e2e/**/*.spec.js'],
  jasmineNodeOpts: {
    showColors: true
  },
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:8080'
};
