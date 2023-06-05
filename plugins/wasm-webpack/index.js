module.exports = function (context, options) {
  return {
    name: 'wasm-webpack',
    configureWebpack(config, isServer, utils) {
      return {
        experiments: {
          asyncWebAssembly: true,
        }
      };
    },
  };
};
