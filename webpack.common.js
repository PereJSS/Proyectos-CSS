const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` tags from JS strings or extracts to separate files
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS with modern @use support
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'), // Use Dart Sass for @use support
              api: 'modern', // Use modern Sass API
              sassOptions: {
                // Enable modern Sass features
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },
};
