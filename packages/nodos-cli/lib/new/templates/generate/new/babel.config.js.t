---
to: './<%= name %>/babel.config.js'
---
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
  ],
};
