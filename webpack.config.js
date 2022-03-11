const path = require('path');

module.exports = {
    // entry: './src/main.js',
    // output: {
    //   path: path.resolve(__dirname, 'public'),
    //   filename: 'bundle.js',
    // },
    // devtool: 'source-map',
    // devServer: {
    //   hot: false,
    // },
    // mode: 'development',
    module: {
        rules: [{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }, ],
    },

};
