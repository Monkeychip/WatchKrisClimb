module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}


