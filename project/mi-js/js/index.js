
handleCart();
handleNavContent();
handleCarousel();
handleCate();
handleTimeDown();
handleFlashPart();
//购物车交互功能
function handleCart(){
	//1.获取元素
	var oCart = document.querySelector('.top .cart');
	var oCartBox = document.querySelector('.top .cart .cart-box a');
	var oCartContent = document.querySelector('.top .cart .cart-content');
	var oLoader = oCartContent.querySelector('.loader');
	var oSpan = oCartContent.querySelector('span');
	//2.绑定事件
	oCart.onmouseenter = function(){
		oLoader.style.display = 'block';
		oCartBox.style.backgroundColor = '#fff';
		oCartBox.style.color = '#ff6700';
		// oCartContent.style.height = '100px';

		animation(oCartContent,{height:100},true,function(){
			oLoader.style.display = 'none';
			oSpan.style.display = 'block';
		});

		
	}
	oCart.onmouseleave = function(){
		oCartBox.style.backgroundColor = '#424242';
		oCartBox.style.color = '#b0b0b0';
		// oCartContent.style.height = '100px';
		animation(oCartContent,{height:0},true,function(){
			oSpan.style.display = 'none';
			oLoader.style.display = 'none';
		});
		
	}
}
//下拉菜单交互功能
function handleNavContent(){
	//1.获取元素
	var aNavtiem = document.querySelectorAll('.header .header-nav-item');
	var oNavContent = document.querySelector('.header .header-nav-content');
	var oNavContentBox = oNavContent.querySelector('.container')
	var hideTimer = 0,loadTimer = 0;
	for(var i=0;i<aNavtiem.length-2;i++){
		aNavtiem[i].index = i;
		aNavtiem[i].onmouseenter = function(){
			oNavContentBox.innerHTML = '<div class="loader"></div>'
			clearTimeout(hideTimer);
			oNavContent.style.borderTop = '1px solid #ccc';
			animation(oNavContent,{height:200});
			var index = this.index;
			//加载数据
			clearTimeout(loadTimer)
			loadTimer = setTimeout(function(){
				loadData(index);
			},1000)
			
		}
		aNavtiem[i].onmouseleave = function(){
			handleHide();
			
		}
	}
	oNavContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	oNavContent.onmouseleave = function(){
		handleHide();
	}
	function handleHide(){
		hideTimer =setTimeout(function(){
			animation(oNavContent,{height:0},true,function(){
				oNavContent.style.borderTop = '';
			})
		},500)
	}
	function loadData(index){
		console.log(index)
		var data = aNavContentData[index];
		var html = '<ul>';
		for(var i=0;i<data.length;i++){
			html +=' <li>';
			html +='	<div class="img-box">';
			html +='		<a href="'+data[i].url+'"><img src="'+data[i].img+'" alt=""></a>';
			html +='	</div>';
			html +='	<p class="product-name">'+data[i].name+'</p>';
			html +='	<p class="product-price">'+data[i].price+'元起</p>';
			html +='</li>';
		}

		html += '</ul>';
		oNavContentBox.innerHTML = html;
	}
}
//实现轮播图
function handleCarousel(){
	new Carousel({
		id:'carousel',
		aImg:['images/carousel1.jpg','images/carousel2.jpg','images/carousel3.jpg'],
		width:1226,
		height:460,
		autoPlayTime:1000
	})
}
//分类列表交互
function handleCate(){
	var aCateItem = document.querySelectorAll('.home .banner .cate .cate-item');
	var oCateContent = document.querySelector('.home .banner .cate-content');
	var oCateBox = document.querySelector('.home .banner .cate-box');
	for(var i=0;i<aCateItem.length;i++){
		aCateItem[i].index = i;
		aCateItem[i].onmouseenter = function(){
			for(var j=0;j<aCateItem.length;j++){
				aCateItem[j].className = 'cate-item';
			}
			this.className = 'cate-item active';
			oCateContent.style.display = 'block';
			//加载数据
			loadData(this.index);
		}
	}
	oCateBox.onmouseleave = function(){
		oCateContent.style.display = 'none';
		for(var j=0;j<aCateItem.length;j++){
			aCateItem[j].className = 'cate-item';
		}
	}
	function loadData(index){
		//通过下标获取到对应的数据
		var data = aCateContentData[index];
		// console.log(data)
		var html = '<ul>';
		for(var i=0;i<data.length;i++){
			html += '<li>';
			html += '	<a href="'+data[i].url+'">';
			html += '		<img src="'+data[i].img+'" alt="">';
			html += '		<span>'+data[i].name+'</span>';
			html += '	</a>';
			html += '</li>';
		}
		html += '</ul>';
		oCateContent.innerHTML = html;
	}

}
//处理倒计时
function handleTimeDown(){

	function to2Str(num){
		return num < 10 ? '0'+num : ''+num;
	}
	var aTiemrNum = document.querySelectorAll('.flash .bd .timer-num');
	var timer = 0;
	// console.log(aTiemrNum)
	var endDate = new Date('2019-09-04 20:34:00');
	var endTime = endDate.getTime();
	function handleTime(){
		var allTime = parseInt((endTime - Date.now())/1000);
		if(allTime<0){
			allTime = 0;
			clearInterval(timer)
		}
		var iHour = parseInt(allTime / 3600);
		var iMinite = parseInt((allTime % 3600)/60);
		var iSecond = (allTime % 3600)%60;
		aTiemrNum[0].innerHTML = to2Str(iHour);
		aTiemrNum[1].innerHTML = to2Str(iMinite);
		aTiemrNum[2].innerHTML = to2Str(iSecond);
	}
	timer = setInterval(handleTime,500);
	handleTime();
}
//处理闪购部分
function handleFlashPart(){
	var aSpan = document.querySelectorAll('.flash .move span');
	var oFlashBox = document.querySelector('.flash .bd .bd-right');
	var oProdcutList = document.querySelector('.flash .bd .product-list');
	aSpan[0].onclick = function(){
		oProdcutList.style.marginLeft = '0px';
	}
	aSpan[1].onclick = function(){
		oProdcutList.style.marginLeft = '-978px';
	}
}
