(function() {
    var matchContentWith = function(keyword, text, callback) {
        var contentArr = text.split(/[\s,，\t、]+/g),
        
        result = contentArr.map(function(str) {
            if(str.search(keyword) > -1) {
                return callback(str);
            } else {
                return str;
            }
        });
        
        return result.join(',');
    };
    
    var toMarkTag = function(str) {
        return '<mark>' + str + '</mark>';
    };
    
    var button = document.getElementById('search-button');
    button.addEventListener('click', function(e){
        var content = document.getElementById('content').value,
            keyword = document.getElementById('keyword').value;
        
        var canvas = document.getElementById('canvas');
        canvas.innerHTML = matchContentWith(keyword, content, toMarkTag);
    });
} ());
