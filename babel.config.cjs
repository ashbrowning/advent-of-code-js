const config = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  plugins: []
};


// export default module;
module.exports = config;


// "@babel/plugin-syntax-dynamic-import": "^7.7.4",
// "@babel/plugin-syntax-import-meta": "^7.7.4",
// "@babel/plugin-transform-modules-commonjs": "^7.7.5",