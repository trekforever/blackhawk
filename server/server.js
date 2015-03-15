module.exports = function(options) {

    var express = require("express");
    var bodyParser = require("body-parser");
    var path = require("path");
    var favicon = require('serve-favicon');

    // require the page rendering logic
    var renderApplication = options.prerender ?
        require("../build/prerender/main.js") :
        require("../webpack/config/main.js");

    // load bundle information from stats
    var stats = require("../build/stats.json");

    var publicPath = stats.publicPath;

    var STYLE_URL = options.separateStylesheet && (publicPath + "main.css?" + stats.hash);
    var SCRIPT_URL = publicPath + [].concat(stats.assetsByChunkName.main)[0];
    var COMMONS_URL = publicPath + [].concat(stats.assetsByChunkName.commons)[0];

    var app = express();
    app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
    // serve the static assets
    app.use("/_assets", express.static(path.join(__dirname, "..", "build", "public"), {
        maxAge: "200d" // We can cache them as they include hashes
    }));
    app.use("/static/", express.static(path.join(__dirname, "..", "public"), {
    }));
    app.disable('x-powered-by');
    app.use(bodyParser.json());

    // REST APIs
    // Note that there is no security in this example
    // Make sure your production server handles requests better!

    // application
    app.get("/*", function(req, res) {
        renderApplication(req.path, {}, SCRIPT_URL, STYLE_URL, COMMONS_URL, function(err, html) {
            res.contentType = "text/html; charset=utf8";
            res.end(html);
        });
    });

    var port = +(process.env.PORT || options.defaultPort || 8080);
    app.listen(port, function() {
        console.log("Server listening on port " + port);
    });
};
