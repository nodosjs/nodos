module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          node: '8',
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    'dynamic-import-node',
  ],
};
