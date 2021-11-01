const path = require('path')

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, './src/index.js')],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    filename: 'library_bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}