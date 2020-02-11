const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const config = {
  context: __dirname + "/src",
  entry: {
    "popup/popup": "./popup/popup.js",
    "options/options": "./options/options.js",
    "content-script": "./content-script.js",
    background: "./background.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".vue"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loaders: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "/images/",
          emitFile: false
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CopyWebpackPlugin([
      { from: "icons", to: "icons", ignore: ["icon.xcf"] },
      {
        from: "popup/popup.html",
        to: "popup/popup.html"
      },
      {
        from: "options/options.html",
        to: "options/options.html"
      },
      {
        from: "background.html",
        to: "background.html"
      },
      {
        from: "manifest.json",
        to: "manifest.json"
      }
    ])
  ]
};

module.exports = config;
