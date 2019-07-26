import webpack from 'webpack';
import merge from "webpack-merge";
import chalk from "chalk";
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.config';

const config = merge(webpackConfig, {
    mode: 'development',
});
const devServerOptions = {
    contentBase: './dist',
    publicPath: config.output.publicPath || '/',
    host: 'localhost',
    hot: true,
    noInfo: true,
    // open: true,
    historyApiFallback: true,
    stats: {
        chunks: false,
        assets: false,
        colors: true,
        cachedAssets: false,
        modules: false,
        children: false,
        entrypoints: false,
    },
};
WebpackDevServer.addDevServerEntrypoints(config, devServerOptions);
const compiler = webpack(config);
const app = new WebpackDevServer(compiler, devServerOptions);
app.listen(9090);
setTimeout(() => {
    console.log(chalk.greenBright('Server listening on: http://localhost:9090/'));
}, 6000);
