import path from 'path';
import webpack from 'webpack';
import _debug from 'debug';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.dev.config';

const debug = _debug('app:bin:server');

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../example/index.html'));
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    debug(err);
    return;
  }
  debug('Listening at http://localhost:3000');
});
