(function(){
var ajax = function(options){
return new ajax.init(options);
}

ajax.init = function(options){
this.request = this.create();
this.data = this.getDetails(options);
}

ajax.init.prototype = {
create : function(){
var request = null;
try{
request = new XMLHttpRequest();
}catch(MS){
try{
request = new ActiveXObject("Msxml2.XMLHTTP");
}catch(otherMs){
try{
request = new ActiveXObject("Microsoft.XMLHTTP");
}catch(failed){
return request;
}
}
}
return request;
},

getDetails : function(options){
var request = this.request;
var url = this.url = options['url'];
var success = this.success = options['success'];
var complete = this.complete = options['complete'];
var error = this.error = options['error'];
var start = this.start = options['start'];
var stop = this.stop = options['stop'];
if(request === null){
alert("Unable to create request");
return;
}
request.onreadystatechange = function(){
(function(){
if(this.readyState === 4){
if(this.status === 200){
success(this.responseText);
}else if(this.status !== 200){
error("Page is Not Found!");
}
}
}).call(request);
};
request.open("GET",url,true);
request.send(null);
}

};

var waterfall = function(options){
return new waterfall.init(options);
};

waterfall.init = function(options){
var _this = this;
this.ncolnum = 2;
this.length = 0;
this.maxH = 0;
this.finished = false;
this.cols = [];
this.filled = [];
for(var item in options){
if(!options.hasOwnProperty(item)){continue;}
this[item] = options[item];
}
this.box = document.getElementById(this.id);
this.state = document.getElementById(this.state);
this.colnum = Math.floor(document.documentElement.clientWidth / this.width);
window.onload = function(){
_this.finished = true;
_this.load();
};
window.onresize = function(){
_this.throttle(function(){
var width = this.width;
var colnum = Math.floor(document.documentElement.clientWidth / width);
var ncolnum = this.ncolnum;
var box = this.box;
colnum < ncolnum ? (box.style.width = colnum * width + "px" ) : (box.style.width = "auto");

if(colnum !== this.colnum){
this.colnum = colnum;
var eles;
var clone;
for(var i = 0; i < this.colnum; i++){
this.cols[i] && (this.cols[i]['height'] = 0);
}
this.colnum = colnum;
this.cols = [];
this.maxH = 0;
this.length = 0;
this.removeFilled();
clone = this.box.cloneNode(true);
eles = this.children(clone);
this.box.innerHTML = "";
this.box.appendChild(clone);
this.appendFilled();
this.arrange(eles,0);
}
},_this,200);
};

window.onscroll = function(){
_this.throttle(function(){
var sTop = document.documentElement.scrollTop || document.body.scrollTop;
if(document.body.clientHeight - document.documentElement.clientHeight - sTop < 50){
this.load();
}
},_this,500);
}
};

waterfall.init.prototype = {
children : function(elem){
var temp = elem.childNodes;
var len = temp.length;
var nodeList = [];
while(len--){
var o = temp[len];
o.nodeType === 1 && nodeList.unshift(o);
}
return nodeList;
},

throttle : function(fn,context,time){
time = time || 100;
clearTimeout(this.timer);
this.timer = setTimeout(function(){
fn.call(context);
},time);
},

imgReady : function(imgs,fn,context,args){
var count = imgs.length;
var len = count;
var _this = this;
if(!count){
return fn.call(context);
}
for(var i = 0; i < len; i++){
var Img = imgs[i];
if(typeof Img.onreadystatechange !== "undefined"){
Img.onreadystatechange = function(){
this.readyState === "complete" && check.call(_this);
}
}else{
Img.onload = function(){
this.onload = null;
check.call(_this);
}
}
}
function check(){
this.state.innerHTML = Math.round(((len - count) / len) * 100) + "%";
count--;
!count && fn.apply(context,args);
}
},

appendFilled : function(){
if(this.filled.length === this.colnum){this.finished = true;return};
var oFragment = document.createDocumentFragment();
var len = this.filled.length;
for(var i = 0; i < this.colnum - len; i++){
var oFilled = document.createElement("li");
oFilled.className = this.iclass;
oFilled.style.cssText = "height:0;overflow:hidden;visibility:hidden;padding-top:0;padding-bottom:0;";
if(document.querySelector){
var oNbsp = document.createTextNode("\n");
oFragment.appendChild(oNbsp);
}
oFragment.appendChild(oFilled);
this.filled.push(oFilled);
}
this.box.appendChild(oFragment);
this.finished = true;
},

removeFilled : function(){
var len = this.filled.length;
for(var i = 0; i < len; i++){
var oFilled = this.filled[i];
oFilled.parentNode.removeChild(oFilled);
}
this.filled = [];
},

arrange : function(eles,start){
var box = this.box;
var ncolnum = this.ncolnum;
var colnum;
var width = this.width;
var len = eles.length;
var oFragment = document.createDocumentFragment();
box.style.visibility = "hidden";
this.colnum < ncolnum ? (colnum = this.colnum = ncolnum,box.style.width = colnum * width + "px") : (colnum = this.colnum,box.style.width = "auto");
for(var i = start; i < len; i++){
var o = eles[i];
var node = o.cloneNode(true);
var col = i % colnum;
o.h = o.offsetHeight;
if(i < this.colnum){
!this.cols[col] && (this.cols[col] = []);
!this.cols[col]["height"] && (this.cols[col]["height"] = 0);
}
if(i && i % colnum === 0){
for(var j = 0; j < colnum; j++){
this.maxH = Math.max(this.maxH,this.cols[j]['height']);
}
}
node.style.marginTop = this.cols[col]['height'] - this.maxH + "px";
this.cols[col]['height'] += o.h;
oFragment.appendChild(node);
if(document.querySelector){
var oNbsp = document.createTextNode("\n");
oFragment.appendChild(oNbsp);
}
this.cols.push(o);
}
this.length = eles.length;
eles[start].parentNode !== box && box.removeChild(eles[start].parentNode);
box.insertBefore(oFragment,this.filled[0] || null);
this.appendFilled();
box.style.visibility = "visible";
this.state.innerHTML = "姝ｅ湪鍔犺浇鈥︹€�";
},

load : function(){
if(!this.finished){return};
this.finished = false;
this.state.innerHTML = "0%";
var _this = this;
var url = this.url + "?args=" + this.count;
var request = ajax({
"url" : url,
"success" : function(data){
if(data.length === 0){
_this.state.style.background = "none";
_this.state.innerHTML = "娌℃湁鏇村鏁版嵁浜�";
}else{
var eles = Array(_this.length);
var temp = document.createElement("ul");
var imgs;
temp.style.cssText = "visibility:hidden;height:0;overflow:hidden";
temp.innerHTML = data;
_this.box.appendChild(temp);
imgs = temp.getElementsByTagName("img");
eles = eles.concat(_this.children(temp));
_this.imgReady(imgs,_this.arrange,_this,[eles,_this.length]);
}
},
"error" : function(msg){
_this.state.innerHTML = msg;
}
});
this.count++;
}
};

var w = waterfall({
"id"      : "waterfall",			//瀹瑰櫒id
"state"   : "loading",				//鎻愮ず淇℃伅id
"ncolnum" : 3,						//榛樿鍒楁暟
"width"   : 218,					//鍒楄〃椤瑰搴�
'iclass'  : "justify_item",			//鍒楄〃椤圭被鍚�
'url'	  : "waterfall.php",		//璇锋眰url
"count"	  : 0						//load璁℃暟鍣�紝鐢ㄤ簬鐢熸垚鏂拌姹傜殑url
});
}());

