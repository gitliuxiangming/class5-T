function animate(obj,attr,target){
	clearInterval(obj.timer);
	var iSpeed = 0;
	obj.timer = setInterval(function(){
		var current = parseFloat(getComputedStyle(obj,false)[attr]);
		if(attr == 'opacity'){
			current = Math.round(current *100);
		}
		if(current < target){
			iSpeed = 7;
		}else{
			iSpeed = -7;
		}
		if(Math.abs(target - current) < Math.abs(iSpeed)){
			if(attr == 'opacity'){
				obj.style[attr] = target/100;
			}else{
				obj.style[attr] = target + 'px';
			}
			clearInterval(obj.timer);
		}else{
			if(attr == 'opacity'){
				obj.style[attr] = (current + iSpeed)/100;
			}else{
				obj.style[attr] = current + iSpeed +'px';
			}
			// console.log(current)
		}
	},30)
}