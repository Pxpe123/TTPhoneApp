const path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/js/index.js", // Specify your entry file
  output: {
    path: path.resolve(__dirname, "./src/js/bundle"), // Output to dist/js/ directory
    filename: "main.js"
  }
};
