import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './example/index',
  ],
  output: {
    path: path.join(__dirname, '/static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /immutable\.js$|draftjs-utils\.js$|draftjs-to-html\.js$|lodash\.js$/,
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?sourceMap',
          'postcss',
          'sass?sourceMap',
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader',
        ),
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('main.css', {
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './example/index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  postcss: () => [autoprefixer],
  resolve: {
    extensions: ['', '.js', '.json'],
  },
};
