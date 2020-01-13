const path =  require('path')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
      app: './src/index.js'
    },  
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({}), new TerserPlugin ({}),
        ]
      },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        overlay: true
      },  
    plugins: [
        new HtmlPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'

        })
    ],
    resolve: {
      extensions: ['.js','.ts']
    },

    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader',
            MiniCssExtractPlugin.loader, 
            {
              loader:'css-loader',
              options: {sourceMap:true}
            },
            {
              loader:'postcss-loader',
              options: {sourceMap:true}
            }],
          },
          {
            test: /\.less$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
          },
          {
            test: /\.scss$/i,
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader, 
              {
                loader:'css-loader',
                options: {sourceMap:true}
              },
              {
                loader:'postcss-loader',
                options: {sourceMap:true}
              },
              {
                loader:'sass-loader',
                options: {sourceMap:true}
              } ],
          },
          { test: /\.js|ts$/, exclude: /node_modules/, loader: "babel-loader" },
        ],
      },

    

}