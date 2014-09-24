/**
 * 散列
 */
var Hashtable = Class({
    init : function() {
        this.setup();
    },
    setup : function() {
        this.table = new Array(137);        
    },
    simpleHash : function(data) {
        var total = 0;
        for( var i=0; i<data.length; i++ ) {
            total += data.charCodeAt(i);
        }
        return total%this.table.length;
    },
    put : function(data) {
        var pos = this.simpleHash(data);
        this.table[pos] = data;
    },
    showDistro : function() {
        var n = 0;
        for(var i =0; i<this.table.length; i++) {
            if( this.table[i] != undefined ) {
                console.log(i + ':' + this.table[i]);
            }
        }
    }
})