({
    mainConfigFile : "js/config.js",
    appDir: "./",
    baseUrl: "js",
    removeCombined: true,
    findNestedDependencies: true,
    dir: "dist",
//    optimize: "none",
    optimizeCss: "standard",
    modules: [
        {
            name: "config",
            exclude: [
                "boilerplate",
                "infrastructure"
            ]
        },
        {
            name: "infrastructure"
        }
    ],
    paths: {
        jquery: "empty:"
    }
//    generateSourceMaps: true
});