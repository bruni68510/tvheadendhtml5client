const path = require('path');

module.exports = {
  entry: './public/javascripts/Main.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js'
  }
};
