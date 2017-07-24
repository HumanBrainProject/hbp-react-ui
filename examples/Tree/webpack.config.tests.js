var path = require('path');
var webpackConfig = require('./webpack.config');

var target = 'Tests';

module.exports = Object.assign({}, webpackConfig, {
    entry: [
        './src/' + target // The is the entry point. The extensions will be specified later in the `resolve` section.
    ],

    output: {
        path: __dirname,
        filename: 'dist/' + target + '.bundle.js' // This is where the compiled bundle will be stored.
    },

    devtool: 'source-map',

    devServer: {
        contentBase: path.resolve('.'),
        inline: true
    }
});

// .\node_modules\.bin\webpack --config webpack.config.tests.js
// .\node_modules\.bin\webpack-dev-server --config webpack.config.tests.js

