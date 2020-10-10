
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
    externals: [
        // nodeExternals(),
        {
          react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
          },
          'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
          }
        }
    ]
}