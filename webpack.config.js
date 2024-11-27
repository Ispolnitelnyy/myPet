const path = require("path");

module.exports = {
  //настройки по умолчанию для среды development
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.js"), //стартовая точка приложения
  // настройки куда и как будем делать сборку приложения
  output: {
    path: path.resolve(__dirname, "build"), // папка билд, идогда именуют как dist
    filename: "bundle.js", // дефолт: "my-first-webpack.bundle.js"
  },
  //   module: {
  //     rules: [{ test: /\.txt$/, use: "raw-loader" }],
  //   },
};
