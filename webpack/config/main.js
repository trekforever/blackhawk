var fs = require("fs");
var path = require("path");
var html = fs.readFileSync(path.resolve(__dirname, "../../app/main.html"), "utf-8");

module.exports = function(path, readItems, scriptUrl, styleUrl, commonsUrl, callback) {
    callback(null, html.replace("SCRIPT_URL", scriptUrl));
};
