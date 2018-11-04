module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          node: '10',
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    '@babel/plugin-proposal-class-properties',
    'dynamic-import-node',
  ],
};
