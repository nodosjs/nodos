module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    'dynamic-import-node',
    '@babel/plugin-proposal-class-properties',
  ],
};
