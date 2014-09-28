/**
 * 动态规划算法
 * 得到斐波那契数列
 * 
 * @param  {[type]} n 位数
 * @return {[type]}   值
 */
function dynFib(n) {
    var val = [];
    for( var i=0; i<n; i++) {
        val[i] = 0;
    }
    if( n == 1 || n == 2) {
        return 1;
    }else {
        val[1] = 1;
        val[2] = 2;
        for( var i=3; i<n; i++) {
            val[i] = val[i-1] + val[i-2];
        }
        return val[n-1];
    }
}


/**
 * 查找两个字符的最长公共子串
 */
function lcs(word1, word2) {
    var max = 0;
    var index = 0;
    var lcsarr = new Array(word1.length+1);
    for( var i=0; i<=word1.length; i++) {
        lcsarr[i] = new Array(word2.length+1);
        for( var j=0; j<=word2.length + 1; j++) {
            lcsarr[i][j] = 0;
        }
    }
    for( var i=0; i<=word1.length; i++) {
        for( var j = 0; j<=word2.length; j++) {
            if( i==0 || j==0) {
                lcsarr[i][j] = 0;
            }else {
                if( word1[i-1] == word2[j-1] ) {
                    lcsarr[i][j] = lcsarr[i-1][j-1]+1;
                }else {
                    lcsarr[i][j]=0;
                }
            }
            if(max<lcsarr[i][j]) {
                max = lcsarr[i][j];
                index = i;
            }
        }
    }
    var str = '';
    if(max == 0) {
        return '';
    }else {
        for(var i=index-max; i<=max; i++) {
            str += word2[i];
        }
        return str;
    }
}

/**
 * 背包问题
 */
function max(a,b) {
    return (a > b) ? a : b;
}
function dKnapsack(capacity, size, value, n) {
    var K =[];
    var str = '';
    for( var i=0; i<capacity+1; i++) {
        K[i] = [];
    }
    for( var i=0; i<=n; i++) {
        for( var w=0; w<=capacity; w++) {
            if( i==0 || w==0) {
                K[i][w] = 0;
            }else if(size[i-1]<=w) {
                K[i][w] = max(value[i-1] + K[i-1][w-size[i-1]]),K[i-1][w]);
            }else {
                K[i][w] = K[i-1][w];
            }
            str += K[i][w] + ' ';
        }
        console.log(str);
    }
    return K[n][capacity];
}