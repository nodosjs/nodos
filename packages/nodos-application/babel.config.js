module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          node: '13',
        },
      },
    ],
  ],
  plugins: [
    'dynamic-import-node',
    '@babel/plugin-proposal-class-properties',
  ],
};
