define(function(require){
    var View = require("backbone").View;
    var ic = require("ishiharaCreator");
    var CLV = require("views/colorListView");
    var _ = require("underscore");

    return View.extend({
        events: {
            "change .colorInputList input": 'updateColor'
        },
        'initialize':function(){
            this.listAView = new CLV({el:'.colorListA','colors':this.options.colorsA});
            this.listBView = new CLV({el:'.colorListB','colors':this.options.colorsB});
        },
        render:function(){
            this.listAView.render();
            this.listBView.render();
        },
        updateColor:function(){
            var colorListA = _.map(this.listAView.$el.find("input"),function(i){
                return i.value;
            });

            var colorListB = _.map(this.listBView.$el.find("input"),function(i){
                return i.value;
            });
            ic.updateColor(colorListA,colorListB);
        }

    });


})