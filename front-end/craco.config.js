const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "": path.resolve(__dirname, "src/"),
      "Components": path.resolve(__dirname, "src/components/"),
      "Configs": path.resolve(__dirname, "src/configs/"),
      "Services": path.resolve(__dirname, "src/services/"),
    },
  },
};
