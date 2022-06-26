// webpack.config.js
module.exports = {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
       options: {
         lessOptions: {
           modifyVars: {
                'primary-color': '#52c41a',
                'link-color': '#52c41a',
                'border-radius-base': '2px',
                //Need customise
                'success-color': '#52c41a', // success state color
                'warning-color': '#faad14', // warning state color
                'error-color': '#f5222d', // error state color
                'font-size-base': '14px', // major text font size
                'heading-color': rgba(0, 0, 0, 0.85), // heading text color
                'text-color': rgba(0, 0, 0, 0.65), // major text color
                'text-color-secondary': rgba(0, 0, 0, 0.45) // secondary text color
         },
         javascriptEnabled: true,
       },
       },
      }],
    }],
  }