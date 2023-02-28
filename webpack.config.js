const path = require('path');

module.exports = {
  entry: './client/src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/public/'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
