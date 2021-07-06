const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
var webpackConfig = require('./webpack.config.js');
var entry = path.resolve(webpackConfig.entry);
var preprocessors = {};
preprocessors['*.html'] = ['html2js'];
preprocessors['*.spec.js'] = ['webpack'];

module.exports = function(config) {
    config.set({
        //basePath: '',
        frameworks: ['mocha', 'chai', 'webpack'],
        files: ['*.html', '*.spec.js'],
        webpack: webpackConfig,
        preprocessors: preprocessors,
        reporters: ['progress'],
        port: 8080,  // karma web server port
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['ChromeHeadlessNoSandbox'],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--headless']
            }
        },
        autoWatch: false,
        // singleRun: false, // Karma captures browsers, runs the tests and exits
        concurrency: Infinity,
        plugins: [
            new CopyPlugin({
              patterns: [
                { from: "../../../build/source/JsMaterialX/JsMaterialX.wasm" },
                { from: "../../../build/source/JsMaterialX/JsMaterialX.js" },
                { from: "../../../build/source/JsMaterialX/JsMaterialX.data" },
              ],
            }),
            require('karma-webpack'),
            'karma-mocha',
            'karma-chai',
            'karma-chrome-launcher',
            'karma-html2js-preprocessor'
        ],
        // html2JsPreprocessor: {
            // strip this from the file path
            //stripPrefix: 'public/',
      
            // prepend this to the file path
            // prependPrefix: 'browser/',
      
            // or define a custom transform function
            // processPath: function(filePath) {
            //   // Drop the file extension
            //   return filePath.replace(/\.html$/, '');
            // }
        // },
        webpack: {
            output: {
                publicPath: '/browser'
            },
            devServer: {
                open: true,
                openPage: 'browser'
            },
            mode: "development",
            plugins: [
            new CopyPlugin({
                patterns: [
                { from: "../../../build/bin/JsMaterialXGenShader.wasm" },
                { from: "../../../build/bin/JsMaterialXGenShader.js" },
                { from: "../../../build/bin/JsMaterialXGenShader.data" },
                ],
            }),
            ],
            externals: {
                JsMaterialX: 'JsMaterialX',
            }
        } 
    })
}