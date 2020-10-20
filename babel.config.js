const presets = [
  "@babel/preset-react",
  [
    "@babel/preset-env",
    {
      "useBuiltIns": "usage",
      "corejs": 3,
      "targets": "> 0.25%, not dead"
    }
  ],
];

const plugins = [
  "@babel/plugin-transform-runtime",
  "@babel/plugin-syntax-jsx"
];

// Export a config object.
module.exports = { presets, plugins };
