const path = require("path");

module.exports = {
  // lintOnSave: false,
  //  publicPath: '/FashionAPP',
  // publicPath: './',
  // outputDir: 'dist',
  // assetsDir: 'static',
  // lintOnSave: true,
  // productionSourceMap: false,
  lintOnSave: false,
  //publicPath: '/FashionAPP',
  assetsDir: "static",
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
      },
    },
  }, //host: 'localhost',
  // devServer: {
  //     open: true,
  //     port: 8080,
  //     https: false,
  //     proxy: {
  //         '/api': {
  //             // target: 'http://localhost:9977/api/',
  //             //target: 'http://10.126.78.156:8080/api/',
  //             ws: false,
  //             changOrigin: true,
  //             pathRewrite: {
  //                 '^/api': '',
  //             },
  //         },
  //     },
  // },
 
};
