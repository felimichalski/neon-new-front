const path = require("path");

const million = require('million/compiler');
module.exports = {
  webpack: {
    plugins: { add: [million.webpack({ auto: true })] }
  }
};