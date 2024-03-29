/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    filename: '[fullhash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/html/index.html"
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [path.join(__dirname, "src"), path.join(__dirname, "node_modules")]
  },
  devServer: {
    historyApiFallback: true,
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: ["eslint-loader"]
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-react"],
                [
                  "@babel/preset-env",
                  { useBuiltIns: "usage", targets: ">0.25%", corejs: 3 }
                ]
              ]
            }
          },
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
              experimentalWatchApi: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader?modules"]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve("file-loader"),
        options: {
          name: "/static/media/[name].[hash:8].[ext]",
        },
      }
    ]
  }
};
