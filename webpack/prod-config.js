module.exports = [
    require("./common-config")({
        commonsChunk: true,
        longTermCaching: true,
        separateStylesheet: true,
        minimize: true,
        // devtool: "source-map",
    })
];