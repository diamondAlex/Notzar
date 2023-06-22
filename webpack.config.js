const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

const copyPlugin = new CopyPlugin({
    patterns:[
        { from: "./public/", to: "public"} 
    ]
});

module.exports = {
    mode:'development',
    entry: {
        bundle:'./src/index.js',
    },
    devtool: 'inline-source-map',
    devServer:{
        contentBase:'./dist',
        historyApiFallback: true,
        watchContentBase: true,
        port:8081
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude:[/node_modules/,/server/],
                loader:"babel-loader",
                options:{
                    plugins: ['@babel/plugin-transform-runtime'],
                    presets: ['@babel/preset-react']
                }
            },
            {
                test: /\.mp3$/,
                include: path.resolve(__dirname,'/public'),
                loader: 'file-loader'
            }
        ]
    },
    plugins:[
        htmlPlugin,
        copyPlugin
    ],
    output: {
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    }
}
