require.config({
//  baseUrl: 'js/',
    paths: {
        jquery: [ 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js', 'libs/jquery/jquery-1.11.2.min' ],
        underscore: 'libs/underscore/underscore-min-1.7.0',
        backbone: 'libs/backbone/backbone-min-1.1.2',
//    helpers: 'helpers',
//    views: 'views'
//    solmiBasics: 'solmiBasics'
        riffwave: 'libs/riffwave/riffwave',
        tuner: 'models/tuner',
        frequenciesextractor: 'models/frequenciesextractor',
        notesfrequencies: 'models/notesfrequencies'
    },
    shim: {
        riffwave: {
//            exports: 'Riffwave'
        },
        tuner: {},
        frequenciesextractor: {},
        notesfrequencies: {},
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        }
    },
//    deps: ['solmi']

});

require(["infrastructure"], function () {
    require(["solmi"], function (solmi) {
//        app.init();
    });
});


//require([
//
//  // Load our app module and pass it to our definition function
////  'solmiBasics'
//  'test10'
//], function(sb){
////    console.log('solmiBasics', sb);
//  // The "app" dependency is passed in as "App"
////  App.initialize();
//});
