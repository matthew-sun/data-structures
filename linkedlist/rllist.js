/**
 * 循环链表
 * js中的数组因为是对象的原因，效率偏慢
 */
var Node = Class({
    init : function(element) {
        this.element = element;
        this.next = null;
    }
});

var LList = Class({
    init : function() {
        this.setup();
    },
    setup : function() {
        this.head = Node('head');
        this.head.next = this.head;
    },
    // 查找给定数据
    find : function(item) {
        var currNode = this.head;
        while(currNode.element != item) {
            currNode = currNode.next;
        }
        return currNode;
    },
    // 插入链表
    insert : function(newElement,item) {
        var newNode = Node(newElement);
        var current = this.find(item);
        newNode.next = current.next;
        current.next = newNode;
    },
    // 显示链表元素
    display : function() {
        var currNode = this.head;
        while(!(currNode.next == null) && !(currNode.next.element == 'head')) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    },
    // 返回要删除节点的前一个节点
    findPrevious : function(item) {
        var currNode = this.head;
        while( !(currNode.next == null) && (currNode.next.element != item) ) {
            currNode = currNode.next;
        }
        return currNode;
    },
    // 删除一个节点
    remove : function(item) {
        var prevNode = this.findPrevious(item);
        if( !(prevNode.next == null) ) {
            prevNode.next = prevNode.next.next;
        }
    }
})