//匀速动画
function animate(obj,attr,target){
	clearInterval(obj.timer);
	var iSpeed = 0;
	obj.timer = setInterval(function(){
		var current = parseFloat(getComputedStyle(obj,false)[attr]);
		if(attr == 'opacity'){
			current = Math.round(current *100);
		}
		if(current < target){
			iSpeed = 9;
		}else{
			iSpeed = -9;
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
//减速动画
function animate1(obj,attr,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var current  = parseFloat(getComputedStyle(obj,false)[attr]);
		if(attr == 'opacity'){
			current = Math.round(current *100);
		}
		var iSpeed = 0;
		iSpeed = (target - current)/10;
		iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if(!iSpeed){
			clearInterval(obj.timer);
		}else{
			if(attr == 'opacity'){
				obj.style[attr] = (current + iSpeed)/100;
			}else{
				obj.style[attr] = current + iSpeed +'px';
			}
		}
		console.log(current,iSpeed)
	},30)
}
/*
	obj 表示要修改的是那个DOM对象
	attr 表示要修改的是哪个属性
	target 表示目标值(就是将属性值修改到多少)
	isLinear 表示动画是匀速还是减速执行(默认是匀速,true是匀速,false是减速)
*/
//综合动画(匀速动画和减速动画最大的区别就是速度和结束条件不同)
function animate2(obj,attr,target,isLinear){
	//让动画默认就是匀速执行
	if(isLinear == undefined){
		isLinear = true;
	}
	//防止开启多个定时器
	clearInterval(obj.timer);
	var iSpeed = 0;//定义速度（如果定义在定时器里边的话，每次都会定义一个变量，在这里只用定义一次）
	obj.timer = setInterval(function(){//开启定时器
		var isStop = false;//用来判断是否要关闭定时器
		var current  = parseFloat(getComputedStyle(obj,false)[attr]);//当前值
		if(attr == 'opacity'){//如果是透明度的话，要乘以100，方便计算
			current = Math.round(current *100);
		}
		if(isLinear){//执行匀速动画
			//匀速动画速度
			if(current < target){
				iSpeed = 7;
			}else{
				iSpeed = -7;
			}
			//匀速动画的结束条件
			if(Math.abs(target - current) < Math.abs(iSpeed)){
				if(attr == 'opacity'){//把匀速动画的结果直接调到目标值(只有匀速才有)
					obj.style[attr] = target/100;
				}else{
					obj.style[attr] = target + 'px';
				}
				isStop = true;//通过此变量决定是否停止动画
			}
		}else{//减速动画
			//减速动画速度
			iSpeed = (target - current)/10;
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			//减速动画的结束条件
			if(!iSpeed){
				isStop = true;//通过此变量决定是否停止动画
			}
		}
		if(isStop){//判断此变量，决定是否关闭定时器
			clearInterval(obj.timer);//关闭定时器
		}else{//不停止动画，继续执行
			if(attr == 'opacity'){
				obj.style[attr] = (current + iSpeed)/100;
			}else{
				obj.style[attr] = current + iSpeed +'px';
			}
		}
	},30)
}
/*
	obj 表示要修改的是那个DOM对象
	attr 表示要修改的是哪个属性
	target 表示目标值(就是将属性值修改到多少)
	isLinear 表示动画是匀速还是减速执行(默认是匀速,true是匀速,false是减速)
	fnEnd 表示结束时的回调函数
*/
//综合动画-链式调用(匀速动画和减速动画最大的区别就是速度和结束条件不同)
function animate3(obj,attr,target,isLinear,fnEnd){
	//让动画默认就是匀速执行
	if(isLinear == undefined){
		isLinear = true;
	}
	//防止开启多个定时器
	clearInterval(obj.timer);
	var iSpeed = 0;//定义速度（如果定义在定时器里边的话，每次都会定义一个变量，在这里只用定义一次）
	obj.timer = setInterval(function(){//开启定时器
		var isStop = false;//用来判断是否要关闭定时器
		var current  = parseFloat(getComputedStyle(obj,false)[attr]);//当前值
		if(attr == 'opacity'){//如果是透明度的话，要乘以100，方便计算
			current = Math.round(current *100);
		}
		if(isLinear){//执行匀速动画
			//匀速动画速度
			if(current < target){
				iSpeed = 7;
			}else{
				iSpeed = -7;
			}
			//匀速动画的结束条件
			if(Math.abs(target - current) < Math.abs(iSpeed)){
				if(attr == 'opacity'){//把匀速动画的结果直接调到目标值(只有匀速才有)
					obj.style[attr] = target/100;
				}else{
					obj.style[attr] = target + 'px';
				}
				isStop = true;//通过此变量决定是否停止动画
			}
		}else{//减速动画
			//减速动画速度
			iSpeed = (target - current)/10;
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			//减速动画的结束条件
			if(!iSpeed){
				isStop = true;//通过此变量决定是否停止动画
			}
		}
		if(isStop){//判断此变量，决定是否关闭定时器
			clearInterval(obj.timer);//关闭定时器
			/*
			if(fnEnd){
				fnEnd();
			}
			*/
			/*
			if(typeof fnEnd == 'function'){
				fnEnd();
			}
			*/
			typeof fnEnd == 'function' && fnEnd();//如果有传入函数的话，执行否则不执行
		}else{//不停止动画，继续执行
			if(attr == 'opacity'){
				obj.style[attr] = (current + iSpeed)/100;
			}else{
				obj.style[attr] = current + iSpeed +'px';
			}
		}
	},30)
}
/*
	obj 表示要修改的是那个DOM对象
	options 表示属性和值的对象
	isLinear 表示动画是匀速还是减速执行(默认是匀速,true是匀速,false是减速)
	fnEnd 表示结束时的回调函数
*/
//综合动画-多值动画(匀速动画和减速动画最大的区别就是速度和结束条件不同)
function animation(obj,options,isLinear,fnEnd){
	//让动画默认就是匀速执行
	if(isLinear == undefined){
		isLinear = true;
	}
	//防止开启多个定时器
	clearInterval(obj.timer);
	var iSpeed = 0;//定义速度（如果定义在定时器里边的话，每次都会定义一个变量，在这里只用定义一次）
	obj.timer = setInterval(function(){//开启定时器
		var isStopAll = true;//当这个值为真是，关闭定时器，停止所有动画
		for(var attr in options){
			var current  = parseFloat(getComputedStyle(obj,false)[attr]);//当前值
			if(attr == 'opacity'){//如果是透明度的话，要乘以100，方便计算
				current = Math.round(current *100);
			}
			if(isLinear){//执行匀速动画
				//匀速动画速度
				if(current < options[attr]){
					iSpeed = 7;
				}else{
					iSpeed = -7;
				}
				//匀速动画的结束条件
				if(Math.abs(options[attr] - current) < Math.abs(iSpeed)){
					if(attr == 'opacity'){//把匀速动画的结果直接调到目标值(只有匀速才有)
						obj.style[attr] = options[attr]/100;
					}else{
						obj.style[attr] = options[attr] + 'px';
					}
				}else{
					isStopAll = false;//只要有一个值没有变化完毕，动画就不能停止（定时器就不能关闭）
				}
			}else{//减速动画
				//减速动画速度
				iSpeed = (options[attr] - current)/10;
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				//减速动画的结束条件
				if(iSpeed){
					isStopAll = false;//只要有一个值没有变化完毕，动画就不能停止（定时器就不能关闭）
				}
			}
			if(isStopAll){//判断此变量，决定是否关闭定时器
				clearInterval(obj.timer);//关闭定时器
				typeof fnEnd == 'function' && fnEnd();//如果有传入函数的话，执行否则不执行
			}else{//不停止动画，继续执行
				if(attr == 'opacity'){
					obj.style[attr] = (current + iSpeed)/100;
				}else{
					obj.style[attr] = current + iSpeed +'px';
				}
			}
		}
		
	},30)
}  
function getScrollTop(){
	return window.pageYOffset ||  document.documentElement.scrollTop || document.body.scrollTop;
}
function getScrollLeft(){
	return window.pageXOffset ||  document.documentElement.scrollLeft || document.body.scrollLeft;
}
function getRandom(min,max){
	return Math.round(min+(max-min)*Math.random());
}
function Carousel(options){
	//罗列属性
	this.oBox = document.getElementById(options.id);
	this.aImg = options.aImg;
	this.width = options.width;
	this.height = options.height;
	this.oLeftBtn = null;
	this.oRightBtn = null;
	this.oImgUl = null;
	this.oBtnUl = null;
	this.now = 0;//表示默认显示第一张
	this.autoPlayTime = options.autoPlayTime;//表示轮播时间
	// console.log(this.oBox)
	//初始化Dom节点
	this.init();
	//绑定事件
	this.bindEvent();
	//执行轮播事件
	if(this.autoPlayTime){
		this.auto();
	}
}
Carousel.prototype.init = function(){
	//针对最外层大盒子设定基本样式
	this.oBox.style.position = 'relative';
	this.oBox.style.width = this.width + 'px';
	this.oBox.style.height = this.height + 'px';
	//生成图片容器
	this.oImgUl = document.createElement('ul');
	//生成底部按钮容器
	this.oBtnUl = document.createElement('ul');
	//设置底部按钮定位属性
	this.oBtnUl.style.position = 'absolute';
	this.oBtnUl.style.zIndex = 99;
	this.oBtnUl.className = 'bottomBtn'
	for(var i=0;i<this.aImg.length;i++){
		var oLi = document.createElement('li');
		var oImg = document.createElement('img');
		var oBtnLi = document.createElement('li');
		//给每个li元素设置样式
		oLi.style.position = 'absolute';
		oLi.style.top = 0 ;
		oLi.style.left = 0 ;
		//给图片设置大小
		oImg.style.width = this.oBox.offsetWidth + 'px';
		oImg.style.height = this.oBox.offsetHeight + 'px';
		if(i == 0){
			oLi.style.zIndex = 50;
			oLi.style.opacity = 1;
			oBtnLi.className = 'active';
		}else{
			oLi.style.zIndex = 0;
			oLi.style.opacity = 0;
			oBtnLi.className = '';
		}
		oImg.src = this.aImg[i];

		//设置顶部按钮列表居中
		oLi.appendChild(oImg);
		this.oImgUl.appendChild(oLi);
		this.oBtnUl.appendChild(oBtnLi);
	}
	//生成左右按钮
	this.oLeftBtn = document.createElement('span');
	this.oRightBtn = document.createElement('span');
	this.oLeftBtn.className = 'leftBtn';
	this.oRightBtn.className = 'rightBtn';
	//设置按钮的位置属性
	this.oLeftBtn.style.position = 'absolute';
	this.oRightBtn.style.position = 'absolute';
	this.oLeftBtn.style.zIndex = 99;
	this.oRightBtn.style.zIndex = 99;
	this.oLeftBtn.innerHTML = '&lt;'
	this.oRightBtn.innerHTML = '&gt;'



	this.oBox.appendChild(this.oImgUl)
	this.oBox.appendChild(this.oLeftBtn)
	this.oBox.appendChild(this.oRightBtn)
	this.oBox.appendChild(this.oBtnUl)
	// console.log(this.oBtnUl.offsetWidth)
	//设置底部按钮居中
	this.oBtnUl.style.marginLeft = - this.oBtnUl.offsetWidth * 0.5 +'px';
}
Carousel.prototype.bindEvent = function(){
	
	var _this = this;
	//右边按钮下一张事件
	this.oRightBtn.onclick = function(){
		_this.now++
		if(_this.now >= _this.oImgUl.children.length){
			_this.now = 0;
		}
		_this.tab();
	}
	//左边按钮上一张事件
	this.oLeftBtn.onclick = function(){
		_this.now--;
		if(_this.now < 0){
			_this.now = _this.oImgUl.children.length -1;
		}
		_this.tab();
	}
	//底部按钮事件
	for(var i=0;i<_this.oBtnUl.children.length;i++){
		_this.oBtnUl.children[i].index = i;
		// console.log(_this.oBtnUl.children.length)
		_this.oBtnUl.children[i].onclick = function(){
			_this.now = this.index;
			_this.tab();
		}
	}
}
Carousel.prototype.tab = function(){
	// console.log(this)
	for(var i=0;i<this.oImgUl.children.length;i++){
		this.oImgUl.children[i].style.zIndex = 0;
		this.oImgUl.children[i].style.opacity = 0;
		this.oBtnUl.children[i].className = '';
	}
	this.oImgUl.children[this.now].style.zIndex = 50;
	// this.oImgUl.children[this.now].style.opacity = 1;
	animation(this.oImgUl.children[this.now],{opacity:100})
	this.oBtnUl.children[this.now].className = 'active';
}
Carousel.prototype.auto = function(){
	// console.log('aaaa')
	var timer = 0;
	var _this = this;
	timer = setInterval(this.oRightBtn.onclick,this.autoPlayTime);
	this.oBox.onmouseover = function(){
		clearInterval(timer)
	}
	this.oBox.onmouseout = function(){
		timer = setInterval(_this.oRightBtn.onclick,_this.autoPlayTime);
	}
}