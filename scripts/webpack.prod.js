import webpack from 'webpack';
import merge from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import VisualizerPlugin from 'webpack-visualizer-plugin';

import webpackConfig from './webpack.config';

const config = merge(webpackConfig, {
    output: {
        filename: 'js/[name].min.[hash].js',
        chunkFilename: 'js/[name].min.[chunkhash].js',
    },
    mode: 'production',
    optimization: {
        moduleIds: 'hashed',
    },
    plugins: [new CleanWebpackPlugin(), new VisualizerPlugin()],
});

const compiler = webpack(config);
compiler.run((err, stats) => {
    if (err) {
        console.log(err);
        return;
    }
    const log = stats.toString({
        assets: false,
        chunks: false,
        colors: true,
        cachedAssets: false,
        modules: false,
        children: false,
        entrypoints: false,
    });
    console.log(log);
});
