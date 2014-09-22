/**
 * 栈
 * 后入先出的数据结构
 */
var Stack = Class({
    init : function() {
        this.setup();
    },
    setup : function() {
        this.dataStore = [];
        this.top = 0;
    },
    // 向栈中压入一个元素
    push : function(element) {
        this.dataStore[this.top++] = element;
    },
    // 返回栈顶元素，同时将top-1(出栈)
    pop : function() {
        return this.dataStore[--this.top];
    },
    // 返回栈顶元素
    peek : function() {
        return this.dataStore[this.top-1];
    },
    // 返回栈元素个数
    length : function() {
        return this.top;
    },
    clear : function() {
        this.top = 0;
    }
})