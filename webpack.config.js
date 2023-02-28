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
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'client/src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
