define(["jquery"],function($){
	return function(canvasWidth,canvasHeight,minDotSize,maxDotSize,spaceBuffer,randomness,passes,colorCallback){
	    var canvas=document.getElementById("myCanvas")
  	  	
	    canvas.width=canvasWidth;
		canvas.height=canvasHeight;
		
	   // var context = canvas.getContext('2d');
		
		
		var pixelLocations={};
	    var drawCircle=function(centerX,centerY,radius,decorator,newCanvas){
			  var x,y; 
	          // context.beginPath();
// 	          context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
// 	          context.fillStyle = color;
// 	          context.fill();
// 	          context.lineWidth = 0;
// 	          context.strokeStyle = color;
// 	          context.stroke();

			  var circle=document.createElementNS("http://www.w3.org/2000/svg", "circle");
 		      circle.setAttributeNS(null,"cx",centerX);
 		      circle.setAttributeNS(null,"cy",centerY);
 		      circle.setAttributeNS(null,"r",radius);
			  circle = decorator(circle);
			  
			  $(newCanvas).append(circle);
		  
			  //We want to record where exactly our circle was so that we can find it later without hav
			  //having to read the canvas
	          for(var theta=0;theta<360;theta+=5){
				  for(var r=1;r<=radius;r++){
					  var radians=2 * Math.PI*theta/360;
				  	  x=centerX+Math.floor(r*Math.cos(radians));
				  	  y=centerY+Math.floor(r*Math.sin(radians));
					  pixelLocations[x+"-"+y]=true;
				  
				  }
	          }

            return circle;
		  }
			  
	     var getDistance=function(location, maxDistance){

	        //Only check up to 
	        for(var s=1;s<maxDistance;s++){
            
	                //Check perimeter
				var check=function(x,y){
                
	                //Conditions:
	                //1. Off the canvas on the x axis
	                //2. OFf the canvas on the y axis
	                //3. Found a point
	                if( ((x<=0||x>=canvasWidth-1) && y==location.y ) ||
	                   ((y<=0||y>=canvasHeight-1) && x==location.x)  ||
	                   ( pixelLocations[x+"-"+y])
	                  ){
	                    return {x:x,y:y}
	                 }else{                 
	                 }
                
				}	
			
	            var scan=function(){
	                var x=location.x;
	                var y=location.y;
	                for(var i=0;i<s;i++){
						var found = 
						check(x+s,y+i) ||             //right
						check(x+s,y-i) ||             //right
						check(x+i,y-s) ||             //bottom
						check(x-i,y-s) ||             //bottom
						check(x-s,y+i) ||             //left
						check(x-s,y-i) ||             //left
						check(x+i,y+s) ||             //top
						check(x-i,y+s);               //top

	                	if(found){
	                		return Math.floor(
								Math.sqrt(
									Math.pow((found.x-location.x),2) +
								    Math.pow((found.y-location.y),2) 
								)
							
							);
	                	}
                   
	                }
	            }
	            var ret= scan();
	            if(ret){
	                return ret;
	            }
             
	        }
	    }
	
		var fillCanvasRandom=function(min,max,buffer,count,decorator){

            
			for(var i=1;i<count;i++){
				var x=Math.floor((Math.random()*(canvasWidth-10))+5);
				var y=Math.floor((Math.random()*(canvasHeight-10))+5);
				var closest=getDistance({x:x,y:y},max)||max;
				closest=closest-buffer;
				if(closest>(min)){
					var radius=Math.floor((Math.random()*(closest-min))+min);
					drawCircle(x,y,radius,decorator,canvas)
				}
			}
			
		}
		var fillCanvasRadial=function(min,max,buffer,randomness,passes,decorator){
			var newCanvas= $("<svg ></svg>");
            var circles=[];
			var maxR=(canvasWidth/2 ) - 20;
			  for(var r=1;r<=maxR;r++){
	  	        for(var theta=0;theta<=360*passes;theta+=5*passes*maxR/r){
				  
				  var radians=2 * Math.PI*theta/360;
			  	  var x=canvasWidth/2+Math.floor(r*Math.cos(radians));
			  	  var y=canvasHeight/2+Math.floor(r*Math.sin(radians));
				  x+= Math.floor((Math.random()*randomness)-randomness/2)
  				  y+= Math.floor((Math.random()*randomness)-randomness/2)
				  
	  		      var closest=getDistance({x:x,y:y},max)||max;
	  		      closest=closest-buffer;
	  			  if(closest>(min)){
	  					var radius=Math.floor((Math.random()*(closest-min))+min);
	  					circles.push(drawCircle(x,y,radius,decorator,canvas));
	  			  }
				  
		  
			  }
	        }

            return circles;
		 // $(canvas).replaceWith(newCanvas);
		 // canvas=newCanvas;
		}
		
        
		
		//Call the fillFunction
		//fillCanvasRandom(minDotSize,maxDotSize,spaceBuffer,dotCount,colorCallback);
		return fillCanvasRadial(minDotSize,maxDotSize,spaceBuffer,randomness,passes,colorCallback);
	
		
	}
	
	
});


