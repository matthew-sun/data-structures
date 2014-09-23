/**
 * 双向链表
 * js中的数组因为是对象的原因，效率偏慢
 */
var Node = Class({
    init : function(element) {
        this.element = element;
        this.previous = null;
        this.next = null;
    }
});

var Dllist = Class({
    init : function() {
        this.setup();
    },
    setup : function() {
        this.head = Node('head');
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
        newNode.previous = current;
        newNode.next = current.next;
        current.next = newNode;
    },
    // 显示链表元素
    display : function() {
        var currNode = this.head;
        while(!(currNode.next == null)) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    },
    // 删除一个节点
    remove : function(item) {
        var currNode = this.find(item);
        if( !(currNode == null) ) {
            currNode.previous.next = currNode.next;
            currNode.next.previous = currNode.previous;
            currNode.next = null;
            currNode.previous = null;
        }
    },
    // 查找最后一个节点
    findLast : function() {
        var currNode = this.head;
        while( !(currNode.next == null) ) {
            currNode = currNode.next;
        }
        return currNode;
    },
    // 反序显示双向链表中的元素
    disReseverse : function() {
        var currNode = this.head;
        currNode = this.findLast();
        while( !(currNode.previous == null) ) {
            console.log(currNode.element);
            currNode = currNode.previous;
        }
    }
})