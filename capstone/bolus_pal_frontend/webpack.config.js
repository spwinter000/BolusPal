module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          // include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use:['style-loader','css-loader']
        },
      ]
    }
  };