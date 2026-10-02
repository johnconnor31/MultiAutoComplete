const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = (web, env) => {
    if (env.mode === 'production') {
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
        }
    } else {
        return {
            mode: 'development',
            entry: {
                index: './src/renderTest.js'
            },
            output: {
                path: path.resolve('./dist'),
                filename: '[name].js'
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
