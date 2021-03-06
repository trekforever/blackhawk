var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var loadersByExtension = require("./ext/loadersByExtension");
var joinEntry = require("./ext/joinEntry");
var fs = require('fs');

module.exports = function(options) {
    var entry = {
        main: options.hotComponents ? ['webpack-dev-server/client?http://localhost:2992/', 'webpack/hot/only-dev-server', './webpack/config/app'] : './webpack/config/app',
        // second: reactEntry("second")
    };
    var loaders = {
        "jsx": options.hotComponents ? ["react-hot", "jsx"] : "jsx",
        "json": "json",
        "json5": "json5",
        "txt": "raw",
        "png|jpg|jpeg|gif|svg": "url?limit=100000",
        "woff|woff2": "url?limit=100000",
        "ttf|eot|ico": "file",
        "html": "html"
    };
    var stylesheetLoaders = {
        "css": "css",
        "less": "css!autoprefixer!less",
    };
    var additionalLoaders = [
         { test: /\.jsx$|\.js$/, loader: "babel?stage=0", exclude:/node_modules|vendor/ },
         { test: /isotope-layout/, loader: "imports?define=>false"},
         { test: /imagesloaded/, loader: "imports?define=>false"}
    ];
    var alias = {

    };
    var aliasLoader = {

    };
    var externals = [

    ];
    var modulesDirectories = ["vendor", "node_modules", "common_modules"];
    var extensions = ["", ".web.js", ".js", ".jsx"];
    var root = path.join(__dirname, "../app");
    var publicPath = options.devServer ?
        "http://localhost:2992/" :
        "/";
    var output = {
        path: path.join(__dirname, "../build", options.prerender ? "prerender" : "public"),
        publicPath: publicPath,
        filename: "[name].js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
        chunkFilename: (options.devServer ? "[id].js" : "[name].js") + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
        sourceMapFilename: "debugging/[file].map",
        pathinfo: options.debug
    };
    var excludeFromStats = [
        /node_modules[\\\/]react(-router)?[\\\/]/,
        /node_modules[\\\/]items-store[\\\/]/
    ];
    var plugins = [
        function() {
            if(!options.prerender) {
                this.plugin("done", function(stats) {
                    var jsonStats = stats.toJson({
                        chunkModules: true,
                        chunkOrigins: true,
                        showModules: true,
                        exclude: excludeFromStats
                    });
                    jsonStats.publicPath = publicPath;
                    if(!fs.existsSync(path.join(__dirname, "../build")))
                    {
                        fs.mkdirSync(path.join(__dirname, "../build"));
                    }
                    fs.writeFileSync(path.join(__dirname, "../build", "stats.json"), JSON.stringify(jsonStats));
                });
            }
        },
        new webpack.PrefetchPlugin("react/addons"),
        new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
    ];
    if(options.prerender) {
        aliasLoader["react-proxy$"] = "react-proxy/unavailable";
        externals.push(
            /^react(\/.*)?$/,
            /^reflux(\/.*)?$/
        );
        plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
    }
    if(options.commonsChunk) {
        plugins.push(new webpack.optimize.CommonsChunkPlugin("commons", "commons.js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : "")));
    }


    function reactEntry(name) {
        return (options.prerender ? "./webpack/config/prerender?" : "./webpack/config/app?") + name;
    }
    Object.keys(stylesheetLoaders).forEach(function(ext) {
        var loaders = stylesheetLoaders[ext];
        if(Array.isArray(loaders)) loaders = loaders.join("!");
        if(options.prerender) {
            stylesheetLoaders[ext] = "null-loader";
        } else if(options.separateStylesheet) {
            stylesheetLoaders[ext] = ExtractTextPlugin.extract("style-loader", loaders);
        } else {
            stylesheetLoaders[ext] = "style-loader!" + loaders;
        }
    });
    if(options.separateStylesheet && !options.prerender) {
        plugins.push(new ExtractTextPlugin("[name].css" + (options.longTermCaching ? "?[contenthash]" : "")));
    }
    if(options.hotComponents) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    if(options.minimize) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            }),
            new webpack.NoErrorsPlugin()
        );
    }

    // Ignore Plugins
    plugins.push(new webpack.IgnorePlugin(/vertx/));
    return {
        entry: entry,
        output: output,
        target: options.prerender ? "node" : "web",
        module: {
            loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders)).concat(additionalLoaders)
        },
        devtool: options.devtool,
        debug: options.debug,
        resolveLoader: {
            root: path.join(__dirname, "../node_modules"),
            alias: aliasLoader
        },
        externals: externals,
        resolve: {
            root: root,
            modulesDirectories: modulesDirectories,
            extensions: extensions,
            alias: alias
        },
        plugins: plugins,
        devServer: {
            stats: {
                exclude: excludeFromStats
            }
        }
    };
};
