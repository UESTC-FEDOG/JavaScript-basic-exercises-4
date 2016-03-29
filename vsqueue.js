var VisualQueue = (function() {


    // 插入排序就像整理扑克牌的手牌：
    
    // [(5, 4), 3, 2, 1, 0] → [(4, 5),3, 2, 1, 0] 理好前两个数
    // [(4, 5, 3), 2, 1, 0] → [(3, 4, 5), 2, 1, 0] 理好前三个数
    // ...以此类推，小括号内的部分相当于手中理好的牌，未加小括号的部分相当于桌上还未整理的牌
    // 每次取桌上首张尚未整理的牌A，插到手中整理好的牌堆中（倒序逐一检视手中的牌，一旦发现牌A比某手牌大，牌A即放在那张牌右边。
    // 由于从一开始就是这么做的，所以手里的牌始终是已经整理好的）
    function insertionSort(arr, callback) {
        var timeout = -500;
        if (arr.length <= 1) return arr;
        for (var i = 1, j, tmp; i < arr.length; i++) {
            
            // 拿起桌上未整理的牌堆中的第一张,称为牌A
            tmp = arr[i];
            j = i;
            
            // 开始倒序检视手牌
            while (j > 0 && arr[j - 1] > tmp) {
                // 牌A不断左移，直到发现一张比牌A大的，不再左移
                arr[j] = arr[j - 1];
                j--;
                arr[j] = tmp;
                
                // 可视化排序过程
                setTimeout(callback.bind(null, arr.slice()), timeout += 1000);
            }
        }
    }
    // 根据一个数组来渲染DOM
    function render(data, canvas) {

        // 总是先清空画布
        canvas.innerHTML = '';

        var content = document.createDocumentFragment();
        data.forEach(function(value) {
            var divEle = document.createElement('div');

            // 设置好高度和内容等等
            divEle.className = 'vq';
            divEle.style.height = value * 2 + 'px';
            divEle.innerHTML = value;

            content.appendChild(divEle);
        });

        canvas.appendChild(content);

    }


    function VisualQueue(ele) {
        this.array = [];
        this.canvas = ele;
    }

    VisualQueue.createElement = function(num) {
        var domobj = document.createElement('div');
        domobj.innerHTML = num;
        domobj.className = 'vq';
        domobj.style.height = num * 2 + 'px';
        return domobj;

    };
    vqProto = VisualQueue.prototype;
    
    //检测是否满60个
    vqProto.isFull = function() {
        return this.array.length >= 60; 
    };

    // 右侧入
    vqProto.push = function(num) {
        var domObj = VisualQueue.createElement(num);
        if (!this.isFull()) {
            this.array.push(num);
            this.canvas.appendChild(domObj);
            return this;
        } else {
            alert('it is full');
            return false;
        }
    };

    // 左侧入
    vqProto.unshift = function(num) {
        var domObj = VisualQueue.createElement(num),
            canvas = this.canvas;

        this.array.unshift(num);
        if (!thiss.isFull()) {
            if (canvas.children.length > 0) canvas.insertBefore(domObj, canvas.firstElementChild);
            else canvas.appendChild(domObj);
            return this;
        } else {
            alert('it is full');
            return false;
        }
    };

    // 右侧出
    vqProto.pop = function() {
        var canvas = this.canvas;
        canvas.removeChild(canvas.lastElementChild);
        alert(this.array.pop());
    };

    // 左侧出
    vqProto.shift = function() {
        var canvas = this.canvas;
        canvas.removeChild(canvas.firstElementChild);
        alert(this.array.shift());
    };

    // 中间出
    vqProto.remove = function(index) {
        this.canvas.removeChild(this.canvas.children[index]);
        this.array.splice(index, 1);
    };

    // 调用排序函数排序
    // 并渲染DOM
    vqProto.sort = function() {
        var that = this;
        insertionSort(this.array, (function() {
            return function(data) {
                render(data, that.canvas);
            };
        } ()));
    };

    return VisualQueue;


} ());