;(function(w){
	var kquery  = function(selector){
		return new kquery.fn.init(selector);
	}
	kquery.fn = kquery.prototype = {
		constructor:kquery,
		init:function(selector){
			if(!selector){//1.false
				return this;
			}else if(kquery.isFunction(selector)){//2.函数
				//函数执行的时间
				document.addEventListener('DOMContentLoaded',selector);
				this[0] = document;
				this.context = document;
				this.length=1;
			}else if(kquery.isString(selector)){//3.字符串
				//3.1html代码段
				if(kquery.isHtml(selector)){
					var dom = document.createElement('div');
					dom.innerHTML = selector;
					for(var i=0;i<dom.children.length;i++){
						this[i] = dom.children[i];
					}
					this.length = dom.children.length;
				}else{//3.2选择器
					var allEle = document.querySelectorAll(selector);
					for(var i=0;i<allEle.length;i++){
						this[i] = allEle[i];
					}
					this.context = document;
					this.length = allEle.length;
					this.selector = selector;
				}
			}else if(kquery.isArray(selector)){//4. 数组
				var arr = [];//4.1真数组//4.2伪数组
				for(var i=0;i<selector.length;i++){
					arr.push(selector[i]);
				}
				return arr;
			}else{//5.对象 其他
				this[0] = selector;
				this.length = 1;
			}
		},
		get:function(num){
			// console.log(this.selector)
			var allEle = document.querySelectorAll(this.selector);
			// console.log(allEle)
			if(num){//有参数
				if(kquery.isNumber){//参数是数字
					if(num>=0){//参数大于0
						return allEle[num];
					}else{//参数小于0
						return allEle[allEle.length+num];
					}
				}else{//参数不是数字
					//默认返回就是undefined
				}
			}else{//没参数
				var arr = [];
				for(var i=0;i<allEle.length;i++){
					arr.push(allEle[i])
				}
				return arr;
			}
		}
	}

	kquery.fn.extend = kquery.extend = function(options){
		for(attr in options){
			this[attr] = options[attr]
		}
	}
	kquery.extend({
		isFunction : function(fn){
			return typeof fn == 'function';
		},
		isString : function(str){
			return typeof str == 'string';
		},
		isHtml : function(str){
			return /<[^<>]+>$/.test(str);
		},
		isArray : function(arr){
			return typeof arr == 'object' && (length in arr);
		},
		isNumber : function(num){
			return typeof num == 'number';
		}
	})

	
	kquery.fn.init.prototype = kquery.prototype;
	w.$ = w.kquery = kquery;
})(window);