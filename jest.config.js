/*
Settings for jest in gatsby project
https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/
 */
module.exports = {
  testEnvironment: 'jsdom', // default is node
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/.jest/jest-preprocess.js', // babel config for jest preprocessing
  },
  moduleNameMapper: {
    // tells jest how to handle imports
    '.+\\.(css|styl|less|sass|scss)$': `<rootDir>/.jest/identity-obj-proxy-esm.js`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`, // jest can't handle files so these are all mocked
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`], // where not to look for tests
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`], // gatsby specific ignore due to un-transpiled ES6 code
  globals: {
    __PATH_PREFIX__: ``, // value is set by gatsby if needed
  },
  setupFiles: [`<rootDir>/.jest/loadershim.js`], // files to include to setup jest test env
  setupFilesAfterEnv: [`<rootDir>/.jest/setup-test-env.js`], // files to include before each jest test file
  testResultsProcessor: 'jest-sonar-reporter',
  testTimeout: 20000,
}
