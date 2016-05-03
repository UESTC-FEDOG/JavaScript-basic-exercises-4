window.onload=function(){
	function $(id){
		return document.getElementById(id);
	}
	//构造函数
	function GetUl(ul){
		this.lists = [];
		this.render = function(){
			var content = '';
			content = this.lists.reduce(function(pre,cur){
				return pre + '<li>' + cur + '</li>'
			},'');
			ul.innerHTML = content;
			delIterm(ul,this);
		}
	}
	GetUl.prototype.del = function(str){
		this.lists.splice(str,1);
		this.render();
	}
	GetUl.prototype.push = function(str){
		this.lists.push(str);
	}
	GetUl.prototype.limit = function(){
		if(this.lists.length>10){
			this.lists.shift();
		}
	}

	var text = $('text');
	var tags = $('tags');
	var textarea = $('textarea');
	var interests = $('interests');
	var btn = $('btn');
	//实例化
	var tagList = new GetUl(tags);
	var interestsList = new GetUl(interests);

	//输入空格，逗号，回车时插入
	function insertTag(){
		var val = this.value;
		var reg = /，| |,|\s/;
		if(reg.test(val)){
			val = val.substring(0, val.length-1);
			if(tagList.lists.indexOf(val.trim())== -1 && val !=''){
				tagList.lists.push(val);
				tagList.render();
			}
			this.value = "";
		}
	}
	//点击删除 

	function delIterm(ul,tagList){
		var li = ul.getElementsByTagName('li');
		for(var i = 0,len = li.length;i<len;i++){
				li[i].onclick = function(i){
					return function(){
						return tagList.del(i)
					}
				}(i)
			
		}
	}
	function getTextarea(){
	var content = textarea.value.trim();
	return content.split(/[,，、\s\n]+/);
}

 	//添加兴趣爱好
 	function addIntrests(){
 		var val = getTextarea();
 			if(val){
 				val.forEach(function(i){
 					if(interestsList.lists.indexOf(i)== -1 && i !=''){
						interestsList.lists.push(i);
						interestsList.limit();
						interestsList.render();
					}
				})
				textarea.value = "";
			}
			console.log(interestsList.lists);
 	}
   function init(){
   	text.onkeyup = insertTag;
   	btn.onclick = function (){addIntrests();}
   }
   init();

}