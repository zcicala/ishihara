define(function(require){
    var View = require("backbone").View;

    return View.extend({
        events: {
        },
        render:function(){
            var div = $("<div class='colorInputList'/>")
            _.each(this.options.colors,function(c){
                $("<span><input class='color' type='color' /></span>").val(c).appendTo(div);
            })
            this.$el.html(div);
        }

    });


})