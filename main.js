(function() {

    function TextareaWithTags(rootEle) {
        var textarea = rootEle.querySelector('textarea'),
            button = rootEle.querySelector('button');
            
        
        button.addEventListener('click', function(e) {
            var content = textarea.value,
                canvas = rootEle.querySelector('.hobby-tags') || document.createElement('div'),
                contentArr = content.split(/[\s,，\t、]+/g);
                
                canvas.innerHTML = contentArr
                
                .filter(function(value, index, array){
                    // 去空字符串以及去重
                    return value.length > 0 && array.indexOf(value) === index;
                })
                .reduce(function(preValue, value, index, array){
                    // 只处理十个数组元素
                    if(index >= 10) return preValue;
                    
                    // 拼接HTML字符串
                    var str = preValue
                            +'<span class="hobby-tag">' + value + '</span>';
                    
                    return str;                           
                },'');
                
                canvas.classList.add('hobby-tags');
                rootEle.appendChild(canvas);
                
                
                
        });
    }
    
    
    // 以下代码完全是shit
    // 完全可以改成MV*结构，但懒得动手了，将就着看看吧
    function Taginput(rootEle) {
        var inputEle = rootEle.querySelector('input');
        
        inputEle.addEventListener('keydown', function(e){
            if (e.keyCode !== 13) return;
            this.value = this.value + ' ';
            var event = new window.CustomEvent('input');
            this.dispatchEvent(event);
        });
        
        inputEle.addEventListener('input', function(e) {
            var str = this.value,
                tagsArr = [],
                reg = /^[\s,，\r]$/g;
                
            if (str.trim() <= 1 || str.match(reg)) return;
            if(str[str.length - 1].match(reg)) {
                
                var tagEle = document.createElement('span'),
                    deleteBtn = document.createElement('button');
                    deleteBtn.innerHTML = '删除';
                    deleteBtn.className = 'delete-btn';
                    
                tagEle.classList.add('tags');
                this.value = '';
                var tagValue = str[str.length -1].match(/\s/) ? str.trim() : str.trim().slice(0, -1);
                if (tagsArr.indexOf(tagValue) >= 0) return;
                else {
                    tagEle.innerHTML = tagValue;
                    tagEle.appendChild(deleteBtn);
                    tagsArr.push(tagValue);
                }
                rootEle.appendChild(tagEle);
            } 
            
        });
        
        rootEle.addEventListener('click', function(e) {
            if (e.target.matches('button')) {
                this.removeChild(e.target.parentNode);
            }
        });
    }

    new TextareaWithTags(document.getElementById('hobby'));
    new Taginput(document.getElementById('tags'));


} ());
