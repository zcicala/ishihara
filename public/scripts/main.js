requirejs.config({
    "baseUrl": "scripts",
	shim: {
        'underscore': {
            exports: '_'
        }
    }
});


define(["canvasManager","mask","underscore"],function(cm,maskGenerator,_){
    var defaults = {
    	min:      5,
		max:      10,
		buffer:   1,
		randomness: 10,
		passes:     50,
		colorSetA:  ['#161','#181'],
		colorSetB:  ['#C33','#A33'] 
		
    }	
	
	
	var create= function(config){
		var min = config.min;
		var max = config.max
		var buffer = config.buffer;
		var randomness = config.randomness;
		var passes = config.passes;
		var text = config.text;
		var colorSetA = config.colorSetA;
		var colorSetB = config.colorSetB;
		
		
		if(!text || text.length==0){
			text=""+Math.floor(Math.random()*99+1);
		}
		console.log(text)
		var mask=maskGenerator(600,600,text);
			
		var start=new Date();
		cm(600,600,min,max,buffer,randomness,passes,function(circle){
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
			return circle
		});
		console.log(new Date().getTime()-start.getTime())
	};
	
	
	
	var update=function(colorSetA,colorSetB){
		
	}
	var config={};
	var search;
    search=decodeURIComponent(window.location.search);
	
	if(search){
		if(search.charAt(0)=='?'){
			search=search.substr(1,search.length-1)
		}
		
		config=JSON.parse(search);
	}
	
	
	create(_.extend(defaults,config));
	
	
	
	return update	;
});