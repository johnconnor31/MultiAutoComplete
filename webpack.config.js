
const path = require('path');
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve('./runnables'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    module: {
    rules: [
        {
            use: 'babel-loader',
            exclude: '/node-modules/',
            test: /\.(js|jsx)$/
        }
        ]
    },
    externals: {
          "react": {
            "commonjs": "react",
            "commonjs2": "react",
            "amd": "react",
            "root": "React"
        },
        "react-dom": {
            "commonjs": "react-dom",
            "commonjs2": "react-dom",
            "amd": "react-dom",
            "root": "ReactDOM"
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}