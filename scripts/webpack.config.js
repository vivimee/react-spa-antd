import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackProgressPlugin from 'progress-bar-webpack-plugin';
import packageJson from '../package.json';

export const PROJECT_ROOT = path.resolve(__dirname, '..');
const themeFilepath = path.resolve(PROJECT_ROOT, 'src', 'assets', 'theme.less');

export default {
    entry: "./src/index.js",
    output: {
        filename: "js/[name].js",
        path: path.resolve(PROJECT_ROOT, "dist"),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.*'],
        alias: {
            '@ant-design/icons/lib/dist$': path.resolve(PROJECT_ROOT, 'src', 'utils', 'icons.js'),
        }
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    {
                        loader: 'eslint-loader',
                        options: { fix: true }
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader', 
                        options: {
                            modifyVars: {
                                hack: `true; @import "${themeFilepath}";`,
                            },
                            javascriptEnabled: true
                        },
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new WebpackProgressPlugin(),
        new HtmlWebpackPlugin({ title: packageJson.name })
    ]
}
