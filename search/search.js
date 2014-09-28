/**
 * 找最小
 * 
 * @param  {[type]} arr 数组
 * @return {[type]}     最小的元素
 */
function findMin(arr) {
    var min = arr[0];
    for( var i=1; i<arr.length; i++) {
        if( arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

/**
 * 找最大
 * 
 * @param  {[type]} arr 数组
 * @return {[type]}     最大的元素
 */
function findMax(arr) {
    var max = arr[0];
    for( var i=1; i<arr.length; i++) {
        if( arr[i] < max) {
            max = arr[i];
        }
    }
    return max;
}

/**
 * 二分法查找
 * 
 * @param  {[type]} arr  待查找数组
 * @param  {[type]} data 待查找值
 * @return {[type]}      mid(位置) || -1
 */
function binSearch(arr, data) {
    var upperBound = arr.length - 1;
    var lowerBound = 0;
    while( lowerBound <= upperBound) {
        var mid = Math.floor( (lowerBound+upperBound)/2 );
        if( arr[mid] < data ) {
            lowerBound = mid + 1;
        }else if ( arr[mid] > data ) {
            upperBound = mid -1;
        }else {
            return mid;
        }
    }
    return -1;
}


/**
 * 统计重复值
 * 
 * @param  {[type]} arr  需统计的数组
 * @param  {[type]} data 查找的值
 * @return {[type]}      数量
 */
function count(arr, data) {
    var count = 0;
    var position = binSearch(arr, data);
    if( position>-1 ) {
        count++;
    }
    for( var i=position-1; i>0; i--) {
        if(arr[i] == data) {
            count ++;
        }else {
            break;
        }
    }
    for( var i=position+1; i<arr.length; i++) {
        if( arr[i] == data) {
            count ++;
        }else {
            break;
        }
    }
    return count;
}