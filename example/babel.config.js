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
    ['@babel/plugin-proposal-decorators', { DecoratorsBeforeExport: true, legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
