/**
 * 数组测试平台
 */
var Carray = Class({
    init : function(numElements) {
        this.setup(numElements);
    },
    setup : function(numElements) {
        this.dataStore = [];
        this.pos = numElements-1;
        this.numElements = numElements;
        this.gaps = [5,3,1];
        for( var i=0; i<numElements; i++) {
            this.dataStore[i] = i;
        }
    },
    setData : function() {
        for( var i=0; i<this.numElements; i++) {
            this.dataStore[i] = Math.floor(Math.random()*(this.numElements+1));
        }
    },
    clear : function() {
        for( var i=0; i<this.numElements; i++) {
            this.dataStore[i] = 0;
        }
    },
    // 插入元素
    insert : function(element) {
        this.dataStore[this.pos++] = element;
    },
    // 转化，方便打印
    toString : function() {
        var restr = '';
        for( var i=0; i<this.dataStore.length; i++) {
            restr += this.dataStore[i] +' ';
            if(i>0 & i%10 ==0) {
                restr += '\n';
            }
        }
        return restr;
    },

    setGaps : function(arr) {
        this.gaps = arr;
    },

    /**
     * 排序方法合集
     */

    /**
     * 冒泡排序
     */
    bubbleSort : function() {
        var numElements = this.dataStore.length;
        var temp;
        for( var outer=numElements; outer>=2; outer--) {
            for( var inner=0; inner<outer-1; inner++ ) {
                if( this.dataStore[inner] > this.dataStore[inner+1] ) {
                    swap(this.dataStore, inner, inner+1);
                }
            }
        }
    },

    /**
     * 选择排序
     * 
     * @return {[type]} 排序好的数组
     */
    selectionSort : function() {
        var min;
        for( var outer=0; outer<=this.dataStore.length-2; outer++) {
            min = outer;
            for( var inner=outer+1; inner<=this.dataStore.length-1; inner++)
                if( this.dataStore[inner]<this.dataStore[min] ) {
                    min = inner;
                }
            swap(this.dataStore, outer, min);
        }
    },

    /**
     * 插入排序
     */
    insertSort : function() {
        var temp, inner;
        for( var outer = 1; outer<=this.dataStore.length-1; outer++) {
            temp = this.dataStore[outer];
            inner = outer;
            while( inner>0 && (this.dataStore[inner-1] >=temp)) {
                this.dataStore[inner] = this.dataStore[inner-1];
                inner--;
            }
            this.dataStore[inner] = temp;
        }
    },

    /**
     * 希尔排序
     */
    shellSort : function() {
        for( var g=0; g<this.gaps.length; g++) {
            for(var i=this.gaps[g]; i<this.dataStore.length; i++) {
                var temp = this.dataStore[i];
                for(var j=i; j>=this.gaps[g] && this.dataStore[j-this.gaps[g]]>temp; j-=this.gaps[g]) {
                    this.dataStore[j] = this.dataStore[j-this.gaps[g]];
                }
                this.dataStore[j] = temp;
            }
        }
    },

    /**
     * 动态计算间隔的希尔排序
     */
    shellSort1 : function() {
        var N = this.dataStore.length;
        var h = 1;
        while(h<N/3) {
            h = 3*h + 1;
        }
        while(h>=1) {
            for(var i=h; i<N; i++) {
                for(var j=i; j>=h && this.dataStore[j]<this.dataStore[j-h]; j-=h) {
                    swap(this.dataStore, j, j-h);
                }
            }
            h = (h-1)/3;
        }
    }
})

/**
 * 交换数组元素
 * 
 * @param  {[type]} arr    交换的数组
 * @param  {[type]} index1 交换值1索引
 * @param  {[type]} index2 交换值2索引
 */
function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}