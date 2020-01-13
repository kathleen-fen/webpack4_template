module.exports = {
    plugins: [
      require('autoprefixer'),
      require('css-mqpacker'),
      require('cssnano')({
          preser:[
              'default',{
                  discardComments: {
                      removeAll: true,
                  }
              }
          ]
      })      
    ]
  }