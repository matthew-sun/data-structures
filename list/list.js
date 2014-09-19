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
            --this.listSize;
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
            ++this.listSize;
            return true;
        }
        return false;
    }
})