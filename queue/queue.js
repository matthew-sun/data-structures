/**
 * 队列
 * 先入先出的数据结构（类似于排队）
 */
var Queue = Class({
    init : function() {
        this.setup();
    },
    setup : function() {
        this.dataStore = [];
    },
    // 向队尾添加一个元素
    enqueue : function(element) {
        this.dataStore.push(element)
    },
    // 删除队首的元素
    dequeue : function() {
        return this.dataStore.shift();
    },
    // 读取队首的元素
    front : function() {
        return this.dataStore[0];
    },
    // 读取队尾的元素
    back : function() {
        return this.dataStore[this.dataStore.length-1]
    },
    // 显示队列的所有元素
    toString : function() {
        var rstr = ''
        for(var i=0,len=this.dataStore.length; i<len; i++) {
            rstr += this.dataStore[i] + '\n';
        }
        return rstr;
    },
    // 判断队列是否为空
    empty : function() {
        if( this.dataStore.length == 0 ) {
            return true;
        }
        return false;
    }
})