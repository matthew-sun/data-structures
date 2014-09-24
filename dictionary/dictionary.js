/**
 * 字典
 * 键值对 形式存储的数据结构
 */
var Dictionary = Class({
    init : function() {
        this.setup();
    },
    setup : function() {
        this.dataStore = {}; 
    },
    // 增加一组键值对
    add : function(key, value) {
        this.dataStore[key] = value;
    },
    // 找到键为key的值
    find : function(key) {
        return this.dataStore[key];
    },
    // 删除一组键值对
    remove : function(key) {
        delete this.dataStore[key];
    },
    // 显示字典内容
    showAll : function() {
        console.log( this.dataStore )
        for(var key in this.dataStore) {
            console.log( key + '->' + this.dataStore[key] );
        }
    },
    // 返回字典中元素的个数
    count : function() {
        var n = 0;
        for( var key in this.dataStore ) {
            n ++;
        }
        return n;
    },
    // 删除全部
    clear : function() {
        for( var key in this.dataStore) {
            delete this.dataStore[key];
        }
    },
    showSortAll : function() {
        var keysort = [];
        for( var key in this.dataStore) {
            keysort.push(key);
        }
        keysort = keysort.sort();
        for(var i=0,len=keysort.length; i<len; i++) {
            console.log( keysort[i] + '->' + this.dataStore[keysort[i]] );
        }
    }
})