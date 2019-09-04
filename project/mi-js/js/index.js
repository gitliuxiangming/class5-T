
handleCart();
handleNavContent();
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
	var hideTimer = 0;
	for(var i=0;i<aNavtiem.length-2;i++){
		aNavtiem[i].index = i;
		aNavtiem[i].onmouseenter = function(){

			clearTimeout(hideTimer);
			oNavContent.style.borderTop = '1px solid #ccc';
			animation(oNavContent,{height:200});
			//加载数据
			loadData(this.index);
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
		var data = aNavContentData[index];
		var html = '<ul>';
		for(var i=0;i<data.length;i++){
			console.log(data[i])
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
