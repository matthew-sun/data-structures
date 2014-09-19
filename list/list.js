/**
 * 列表
 */
var List = Class({
    init : function() {
        this.setup();
    },
    setup : function() {
        this.listSize = 0 ; // 元素个数
        this.pos = 0; // 列表的当前位置
        this.dataStore = []; // 列表元素存储
    },
    // 列表末尾添加新元素
    append : function(element) {
        this.dataStore[this.listSize++] = element;
    },
    // 查找某一元素，成功返回该元素在列表中的位置，失败返回-1
    find : function(element) {
        for( var i=0,len=this.dataStore.length; i<len; i++ ) {
            if( this.dataStore[i] == element ) {
                return i ;
            }
        }
        return -1;
    },
    // 删除指定元素，返回删除的成功状态，true || false
    remove : function(element) {
        var foundAt = this.find(element);
        if( foundAt > -1 ) {
            this.dataStore.splice(foundAt,1);
            this.listSize--;
            return true;
        }
        return false;
    },
    // 返回列表中元素的个数
    length : function() {
        return this.listSize;
    },
    // 显示列表中的元素
    toString : function() {
        return this.dataStore;
    },
    // 向列表中插入一个元素
    insert : function(element,after) {
        var insertPos = this.find(after);
        if( insertPos > -1 ) {
            this.dataStore.splice(insertPos+1,0,element);
            this.listSize++;
            return true;
        }
        return false;
    },
    // 判断给定值是否在列表中
    contains : function(element) {
        if ( this.find(element) === -1 ) {
            return false;
        }
        return true;
    },
    // 遍历列表
    // 移动到列表的第一个元素
    front : function() {
        this.pos = 0;
    },
    // 移动到列表的最后一个元素
    end : function() {
        this.pos = this.listSize-1;
    },
    // <-
    prev : function() {
        if( this.pos > 0 ) {
            this.pos--;
        }
    },
    // ->
    next : function() {
        if( this.pos < this.listSize-1 ){
            this.pos++;
        }
    },
    // 当前位置
    currPos : function() {
        return this.pos;
    },
    // 移动到某一位置
    moveTo : function(position) {
        this.pos = position;
    },
    // 获取当前位置的元素
    getElement : function() {
        return this.dataStore[this.pos];
    },
    // 清空列表中的所有的元素
    clear : function() {
        delete this.dataStore;
        this.dataStore = [];
        this.listSize = this.pos = 0; // 空列表
    }
})