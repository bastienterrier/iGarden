module.exports = {
  publicPath: '/iGarden/',
  devServer: {
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
      },
    },
  },
};
