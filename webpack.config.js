const path = require("path")

module.exports = {
   entry: path.join(__dirname, "./src/index.js"),
   output: {
     filename: "[name].bundle.js",
     path: path.resolve(__dirname, "dist")
  },
}