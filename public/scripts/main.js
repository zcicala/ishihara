define(["canvasManager","mask"],function(cm,maskGenerator){
	var fn= function(min,max,buffer,randomness,passes,text,colorSetA,colorSetB){
		
		
		if(!text || text.length==0){
			text=""+Math.floor(Math.random()*99+1);
			console.log(text)
		}
		var mask=maskGenerator(600,600,text);
			
		var start=new Date();
		cm(600,600,min,max,buffer,randomness,passes,function(x,y){
			if(mask[x+"-"+y]){
				return colorSetA[Math.floor(Math.random()*colorSetA.length)];
			}else{
				return colorSetB[Math.floor(Math.random()*colorSetB.length)];
			}
		});
		console.log(new Date().getTime()-start.getTime())
	};
	
	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	var colorgroup1=getParameterByName("colorGroup1")?JSON.parse(getParameterByName("colorGroup1")):['161','181'];
	var colorgroup2=getParameterByName("colorGroup2")?JSON.parse(getParameterByName("colorGroup2")):['C33','A33'];
	
	fn(5,10,0,10,50,"",colorgroup1,colorgroup2);
	return fn;
});