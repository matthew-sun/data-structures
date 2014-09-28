/** 
 * 快速排序
 * 利用递归，根据基准值，左右乱入
 * 
 * @param  {[type]} arr 待排序的数组
 * @return {[type]}     排好序的数组
 */
function qsort(arr) {
    if( arr.length == 0 ){
        return [];
    }
    var left = [],
        right = [],
        pivot = arr[0];
    for( var i=1,len=arr.length; i<len; i++) {
        arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
    }
    return qsort(left).concat(pivot,qsort(right));
}