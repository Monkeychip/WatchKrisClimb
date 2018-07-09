module.exports = {
  displayName: 'strava app',
  setupTestFrameworkScriptFile: require.resolve(
    './test/setup-test-framework.js',
  ),
  setupFiles: [
    'jest-localstorage-mock'
  ],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**'
  ],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy'
  },
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0
    }
  },
  transformIgnorePatterns: [
    'node_modules/(?!(redux-persist)/)'
  ]
}