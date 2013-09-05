define([],function(){
	//We're going to create a canvas, write the text on it, then return a map of where there are pixels
	return function(height,width,text){
		var returnData={}
		var fontsize=Math.floor(height*0.75);
		var maskCanvas=document.createElement("canvas");
		maskCanvas.width=height;
		maskCanvas.height=width;
		
		var context = maskCanvas.getContext("2d");
		
		context.fillStyle = "black";
		context.font = "bold "+fontsize+" Arial";
		
		var textMeasure=context.measureText(text);
		var textX=(width/2)-(textMeasure.width/2);
		var textY=(height/2)+Math.floor(fontsize/3);
		
		context.fillText(text, textX,textY);
		
		var x,y;
		var imageData=context.getImageData(0,0,width,height)
		var dataAraryLen=imageData.data.length/4;
		for(var i=0;i<dataAraryLen;i++){
			if(imageData.data[((i+1)*4)-1]==255){
				x=i%width;
				y=Math.floor(i/width);
				returnData[x+"-"+y]=true;
			}
		}
		return function(x,y){
			return 	returnData[x+"-"+y];
		};
		
	}
})