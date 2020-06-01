const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
  {
    name: 'client',
    mode: 'development',
    entry: './src/index.ts',
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ]
    },
    resolve: {
      modules: [
        'node_modules'
      ],
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ title: 'SortOfMultiplayer' })
    ]
  }, {
    name: 'server',
    mode: 'development',
    target: 'node',
    entry: './src/server/index.js',
    output: {
      filename: 'server.[hash].js',
      path: path.resolve(__dirname, 'dist')
    }
  }
];