// 转化进制
function mulBase(num,base) {
    var s = new Stack();
    while(num > 0) {
        s.push(num % base);
        num = Math.floor(num /= base);
    }
    var converted = '';
    while (s.length()>0) {
        converted += s.pop();
    }
    return converted;
}