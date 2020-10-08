
const path = require('path');
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve('./runnables'),
        filename: '[name].js'
    },
    module: {
    rules: [
        {
            use: 'babel-loader',
            exclude: '/node-modules/',
            test: /\.(js|jsx)$/
        }
        ]
    }
}