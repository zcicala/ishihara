requirejs.config({
    "baseUrl": "scripts",
	shim: {
        'underscore': {
            exports: '_'
        }
    },

    paths: {
        // RequireJS plugins
        'jquery':        'lib/jquery',
        'backbone':      'lib/backbone',
        'underscore':    'lib/underscore',

    }
});


define(["ishiharaCreator","views/ishiharaMain","lib/jscolor"],function(ic,im,jscolor){
    var search;
    var config;


    search=decodeURIComponent(window.location.search);

    if(search){
        if(search.charAt(0)=='?'){
            search=search.substr(1,search.length-1)
        }

        config=JSON.parse(search);
    }

    ic.create(config);
    new im({el:"body",
            colorsA:ic.config.colorSetA,
            colorsB:ic.config.colorSetB}).render();
    $("svg").click(function(){ $(".ColorB").toggle();});
	

});