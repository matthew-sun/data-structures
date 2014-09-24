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
    }
})