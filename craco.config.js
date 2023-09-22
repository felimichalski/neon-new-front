const path = require("path");

const million = require('million/compiler');
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Cambia la carpeta de salida a "build" en este ejemplo
      webpackConfig.output.path = path.resolve(__dirname, "../neon-dist/front");
      return webpackConfig;
    },
    plugins: { add: [million.webpack({ auto: true })] }
  }
};