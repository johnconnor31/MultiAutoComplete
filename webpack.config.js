
const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = env => {
    if (env === 'production') {
        return {
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
    } else {
        return {
            mode: 'development',
            entry: {
                index: './src/renderTest.js'
            },
            module: {
                rules: [
                    {
                        exclude: '/node-modules/',
                        test: /\.(js|jsx)$/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env', '@babel/preset-react']
                            }
                        }
                    }
                ]
            },
            plugins: [
                new htmlPlugin({
                    template: path.join(__dirname, 'src', './static/index.html')
                })
            ]
        }
    }
};
