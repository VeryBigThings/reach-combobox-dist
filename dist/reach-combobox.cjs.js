'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./reach-combobox.cjs.prod.js");
} else {
  module.exports = require("./reach-combobox.cjs.dev.js");
}
