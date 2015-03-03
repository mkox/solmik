({
//    mainConfigFile : "js/main.js",
    mainConfigFile : "js/config.js",
    appDir: "./",
    baseUrl: "js",
    removeCombined: true,
    findNestedDependencies: true,
    dir: "dist",
    optimize: "none",
    optimizeCss: "standard",
    modules: [
        {
//            name: "main",
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
//        machina: "empty:"
        jquery: "empty:"
    },
    generateSourceMaps: true
});