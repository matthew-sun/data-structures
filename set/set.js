/**
 * 集合
 * 不同元素的数据集合，无序
 */
var Set = Class({
    init : function() {
        this.setup();
    },
    setup : function() {
        this.dataStore = []; 
    },
    add : function(data) {
        if( this.dataStore.indexOf(data) < 0 ) {
            this.dataStore.push(data);
            return true;
        }
        return false;
    },
    remove : function(data) {
        var pos = this.dataStore.indexOf(data);
        if( pos > -1 ) {
            this.dataStore.splice(pos,1);
            return true;
        }
        return false;
    },
    show : function() {
        return this.dataStore;
    },
    contains : function(data) {
        return this.dataStore.indexOf(data) > -1 ? true : false;
    },
    // 两个集合的并集
    union : function(set) {
        var tempSet = Set();
        for( var i=0; i<this.dataStore.length; i++ ) {
            tempSet.add(this.dataStore[i]);
        }
        for( var i=0; i<set.dataStore.length; i++ ) {
            if( !(tempSet.contains(set.dataStore[i])) ) {
                tempSet.add(set.dataStore[i]);
            }
        }
        return tempSet;
    },
    // 两个集合的交集
    intersect : function(set) {
        var tempSet = Set();
        for( var i=0; i<this.dataStore.length; i++ ) {
            if( (set.contains(this.dataStore[i])) ) {
                tempSet.add(set.dataStore[i]);
            }
        }
        return tempSet;
    },
    // 两个集合的补集
    difference : function(set) {
        var tempSet = Set();
        for( var i=0; i<this.dataStore.length; i++ ) {
            if( !(set.contains(this.dataStore[i])) ) {
                tempSet.add(this.dataStore[i]);
            }
        }
        return tempSet;
    },
    // 返回集合的长度
    size : function() {
        return this.dataStore.length;
    },
    // 判断是否是另一个集合的子集
    subset : function(set) {
        if( this.size() > set.size ) {
            return false ;
        }
        for(var i=0,len=this.dataStore.length; i<len; i++) {
            if( !set.contains(this.dataStore[i]) ) {
                return false;
            }
        }
        return true;
    }
})