define(["canvasManager","mask","underscore","jquery"],function(cm,maskGenerator){
    var lastConfig = {
        min:      5,
        max:      10,
        buffer:   1,
        randomness: 10,
        passes:     50,
        colorSetA:  ['#106010','#108010'],
        colorSetB:  ['#C03030','#A03030']

    }


    var colorMask = function(circle){
        var mask = lastConfig.mask;
        var colorSetA = lastConfig.colorSetA;
        var colorSetB = lastConfig.colorSetB;

        var x = circle.getAttributeNS(null,"cx");
        var y = circle.getAttributeNS(null,"cy");
        var colorIndex;
        if(mask(x,y)){
            colorIndex = Math.floor(Math.random()*colorSetA.length);
            circle.setAttributeNS(null,"class","ColorA A"+colorIndex);
            circle.setAttributeNS(null,"fill",colorSetA[colorIndex]);
        }else{
            colorIndex = Math.floor(Math.random()*colorSetB.length);
            circle.setAttributeNS(null,"class","ColorB B"+colorIndex);
            circle.setAttributeNS(null,"fill",colorSetB[colorIndex]);
        }
        return circle;
    };


    var create= function(config){
        var min = lastConfig.min;
        var max = lastConfig.max
        var buffer = lastConfig.buffer;
        var randomness = lastConfig.randomness;
        var passes = lastConfig.passes;
        var text = lastConfig.text;

        lastConfig = _.extend(lastConfig, config);
        if(!text || text.length==0){
            text=""+Math.floor(Math.random()*99+1);
        }
        console.log(text)

        lastConfig.mask=maskGenerator(600,600,text);
        lastConfig.circles = cm(600,600,min,max,buffer,randomness,passes,colorMask);

    };



    var updateColor=function(colorSetA,colorSetB){
        lastConfig.colorSetA = colorSetA;
        lastConfig.colorSetB = colorSetB;

        _.each(lastConfig.circles, colorMask);
    }
    return {'create'     : create,
            'updateColor': updateColor,
            'config': lastConfig
    }	;
})