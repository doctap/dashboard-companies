const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: ['web', 'es3']
};

module.exports = (env, argv) => {
  console.log(`This is the Webpack 5 'mode': ${JSON.stringify(argv)}`);
  console.log(`This is the Webpack 5 'mode': ${JSON.stringify(env)}`);
  return {
    mode: argv.mode,
    entry: './src/index.tsx',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, './dist'),
      clean: true,
      publicPath: './',
      assetModuleFilename: 'src/assets/[name][ext]'
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
      static: {
        directory: path.join(__dirname, '/dist')
      },
      compress: true,
      port: 3000,
      historyApiFallback: true,
      open: true,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          loader: 'ts-loader'
        },
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [
            // Creates `style` nodes from JS strings
            { loader: 'style-loader' },
            // Translates CSS into CommonJS
            { loader: 'css-loader' },
            // Compiles Sass to CSS
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
      }),
      new MiniCssExtractPlugin({
        filename: './src/index.css'
      })
    ]
  };
};
