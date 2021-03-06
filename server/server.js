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
    app.use("/", express.static(path.join(__dirname, "..", "build", "public"), {
        maxAge: "200d" // We can cache them as they include hashes
    }));
    app.use("/static/", express.static(path.join(__dirname, "..", "public"), {
    }));
    app.disable('x-powered-by');
    app.use(bodyParser.json());

    // REST APIs
    // Note that there is no security in this example
    // Make sure your production server handles requests better!

    // Webpack Dev Server
    if(options.devServer) {
        var Webpack = require('webpack');
        var WebpackDevServer = require('webpack-dev-server');
        var WebpackDevConfig = require('../webpack/dev-config');

        var webpackDevServer = new WebpackDevServer(Webpack(WebpackDevConfig), {
          publicPath  : "http://localhost:2992/",
          contentBase : "http://localhost:8081/",
          hot         : true,
          progress    : true,
          stats       : {
            colors: true
          }
        });
        webpackDevServer.listen(2992, function(err, result) {
          if (err) {
            console.log(err);
          }
        });
        console.log("Webpack development web server started on port: 2992 ");
    }
    // application
    app.get("/*", function(req, res) {
        renderApplication(req.path, {devServer: options.devServer}, SCRIPT_URL, STYLE_URL, COMMONS_URL, function(err, html) {
            res.contentType = "text/html; charset=utf8";
            res.end(html);
        });
    });

    var port = +(process.env.PORT || options.defaultPort || 8081);
    app.listen(port, function() {
        console.log("Server listening on port " + port);
    });
};
