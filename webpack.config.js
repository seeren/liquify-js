const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js',
    ],
    output: {
		path:  __dirname + "/dist",
        filename: 'liquify.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    watchOptions: {
        ignored: [
            /node_modules/,
            /test/
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: [
                    './'
                ]
            }
        })
    ]
};