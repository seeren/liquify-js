const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js',
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: 'liquify.js',
        globalObject: 'this',
        assetModuleFilename: 'assets/[name][ext]',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: 'raw-loader',
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg|ico)$/,
                type: 'asset/resource',
            },
        ],
    },
    watchOptions: {
        ignored: [
            '.nyc_output',
            'coverage',
            'node_modules',
            'resources',
            'test',
            'www',
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    infrastructureLogging: {
        level: 'error',
    },
    devServer: {
        static: './src/',
        https: false,
        host: 'localhost',
        port: 8080,
    },
};
