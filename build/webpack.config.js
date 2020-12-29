const path = require("path");
const utils = require("../utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const vueLoaderPlugin = require("vue-loader/lib/plugin");
const rootPath = path.join(__dirname, "../");
var SpritesmithPlugin = require("webpack-spritesmith");

if (process.env.NODE_ENV !== "production") {
  new CleanWebpackPlugin();
}

module.exports = {
  entry: path.resolve(__dirname, "../src/main.js"),
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "../dist"), //打包的路径
  },
  resolve: {
    alias: {
      "@": rootPath,
    },
    extensions: [
      ".jsx",
      ".json",
      ".js",
      ".vue",
      ".ts",
      ".d.ts",
      ".tsx",
      ".scss",
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", // 生成的文件夹名
      template: path.resolve(__dirname, "../pubilc/index.html"),
    }),
    // new CleanWebpackPlugin(),
    new vueLoaderPlugin(),
    // 雪碧图
    new SpritesmithPlugin({
      // 图片目录
      src: {
        cwd: path.resolve(__dirname, "../src/assets/images/icons"),
        glob: "*.png",
      },
      // 生成图片
      target: {
        image: path.resolve(
          __dirname,
          "../src/assets/images/sprite/sprite.png"
        ), // 生成雪碧图目标路径与名称
        // 设置生成CSS背景及其定位的文件或方式
        css: [
          [
            path.resolve(__dirname, "../src/assets/scss/icon/sprite.scss"),
            { format: "function_based_template" },
          ],
        ],
      },
      customTemplates: {
        function_based_template: utils.scssTemplateFunction,
      },
      apiOptions: {
        cssImageRef: "~@/src/assets/images/sprite/sprite.png",
      },
      spritesmithOptions: {
        algorithm: "binary-tree",
        padding: 40,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          // "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              outputPath: "static/img",
              esModule: false, // <- here
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 8080, // 启动服务端口
  },
};
