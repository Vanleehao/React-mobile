const utils = require("./utils")
const path = require("path")

module.exports = {
  // 入口
  entry: {
    app: "./src/index"
  },
  // 出口
  output: {
    path: utils.resolve("../dist"),
    filename: "js/[name].[hash].js",
    publicPath: "/" // 打包后的资源的访问路径前缀
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.join(__dirname, '..', "src")
    }
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env'], '@babel/preset-react'],
          plugins: [
            ["react-hot-loader/babel"],
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ["import", { libraryName: "antd-mobile", libraryDirectory: "es", style: "css" }] // `style: true` 会加载 less 文件
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          }
        ]
      }, { // antd样式处理
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  stats: { children: false },
  performance: {
    hints: false
  },
  devtool: 'module-eval-source-map'
}
