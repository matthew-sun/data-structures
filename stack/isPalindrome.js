/**
 * 判断给定字符串是否是回文数
 * 
 * @param  {[type]}  word [description]
 * @return {Boolean}      [description]
 */

function isPalindrome(word) {
    var s = new Stack();
    for( var i=0,len=word.length; i<len ;i++ ) {
        s.push(word[i]);
    }
    var rword = '';
    while( s.length() > 0 ) {
        rword +=s.pop();
    }
    if ( word == rword) {
        return true;
    }
    return false;
}