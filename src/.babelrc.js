const isTest = String(process.env.NODE_ENV) === 'test'
module.exports = {
  presets: [
    ['env', {modules: isTest ? 'commonjs' : false}],
    'react',
    'flow'
  ],
  plugins: [
    'react-flow-props-to-prop-types',
    'syntax-dynamic-import',
    'transform-class-properties',
    'transform-object-rest-spread',
    isTest ? 'dynamic-import-node' : null,
  ].filter(Boolean),
}