'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  mode: (NODE_ENV === 'development') ? 'development' : 'production',

  context: __dirname + '/src/js',

  // entry: {
  //   main:  './main.js',
  // },

  output: {
    path:  __dirname + '/public/assets/js/',
    filename: '[name].js'
  },

  devtool: (NODE_ENV === 'development') ? 'eval' : 'none',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                'targets': {
                  'browsers': [
                    'last 2 versions',
                    '> 5%',
                    'not dead',
                    'ie >= 11'
                  ],
                }
              }],
            ],
          }
        }
      }
    ]
  }
}
