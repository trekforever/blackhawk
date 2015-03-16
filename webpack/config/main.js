var fs = require("fs");
var path = require("path");
var html = fs.readFileSync(path.resolve(__dirname, "../../app/main.html"), "utf-8");
var devHtml = fs.readFileSync(path.resolve(__dirname, "./dev.html"), "utf-8");

module.exports = function(path, opts, scriptUrl, styleUrl, commonsUrl, callback) {
    if(opts.devServer) {
      callback(null, devHtml.replace("SCRIPT_URL", scriptUrl));
    } else {
      callback(null, html
            .replace("STYLE_URL", styleUrl)
            .replace("SCRIPT_URL", scriptUrl)
            .replace("COMMONS_URL", commonsUrl));
    }
};
