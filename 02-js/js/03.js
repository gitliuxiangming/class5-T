/*函数*/
function toBig(){
	var oDiv = document.getElementById('box');
	oDiv.style.width='200px';
	oDiv.style.height='200px';
	oDiv.style.backgroundColor='blue';
}
function toSmall(){
	var oDiv = document.getElementById('box');
	oDiv.style.width='100px';
	oDiv.style.height='100px';
	oDiv.style.backgroundColor='red';
}
var oDiv = document.getElementById('box');
var oDiv1 = document.getElementById('box1');
/*
oDiv.onmouseover=toBig;
oDiv.onmouseout=toSmall;
*/
/*匿名函数就是没有名字的函数*/

oDiv.onmouseover = toBig;

oDiv.onmouseout = function(){
	toSmall()
}
