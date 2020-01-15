const path =  require('path')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin =  require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const PATHS = {
    src: path.join(__dirname,'./src'),
    dist: path.join(__dirname,'./dist'),
    assets: 'assets/'
}

module.exports = {

    externals: {
        paths: PATHS
    },
    mode: 'production',
    entry: {
      app: PATHS.src
    },  
    output: {
        // filename: '[name].js',
        // path: path.resolve(__dirname, 'dist')
        filename:  `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({}), new TerserPlugin ({}),
        ]
      },
    
    plugins: [
        new VueLoaderPlugin(),
        new HtmlPlugin({
            hash:false,
            filename: 'index.html',
            template: `${PATHS.src}/index.html`
        }),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`

        }),
        new CopyWebpackPlugin([
            {from: `${PATHS.src}/img`, to: `${PATHS.assets}img`},
            {from: `${PATHS.src}/static`, to: ''}

        ])
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
          { 
            test: /\.vue/, 
            loader: "vue-loader",
            options:{
              loader: {
                scss: 'vue-style-loader!css-loader!sass-loader'
              }
            } 
          },

          { 
              test: /\.(png|jpg|gif|svg)$/, 
              exclude: /node_modules/, 
              loader: "file-loader",
              options: {
                  name: '[name].[ext]'
              }
             }
        ],
      },
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.js'
        }
  
      }  

    

}