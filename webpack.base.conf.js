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
      app: PATHS.src,
      lk: `${PATHS.src}/lk.js`
    },  
    output: {
        // filename: '[name].js',
        // path: path.resolve(__dirname, 'dist')
        filename:  `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
          cacheGroups:{
            vendor: {
              name: 'vendors',
              test: /node_modules/,
              chunks: 'all',              
              enforce: true
            }
          }
        },
        minimizer: [
            new OptimizeCssAssetsPlugin({}), new TerserPlugin ({}),
        ]
      },
    
    plugins: [
        new VueLoaderPlugin(),
        new HtmlPlugin({
            // hash:false, //default, not Necessarily
            filename: 'index.html',
            template: `${PATHS.src}/index.html`,
            inject: false, // you can add css link in html by hand, not automatically
            title: 'Webpack template'
        }),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`

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