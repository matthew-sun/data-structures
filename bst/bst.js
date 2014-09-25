/**
 * 二叉树
 */
var Node = Class({
    init : function(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    },
    show : function() {
        return this.data;
    }
})

var Bst = Class({
    init : function() {
        this.setup();
    },
    setup : function() {
        this.root = null; 
    },
    // 插入
    insert : function(data) {
        var n = Node(data, null, null);
        if( this.root == null ) {
            this.root = n;
        }else {
            var current = this.root;
            var parent;
            while(true) {
                parent = current;
                if( data < current.data ) {
                    current = current.left;
                    if( current == null ) {
                        parent.left = n;
                        break;
                    }
                }else {
                    current = current.right;
                    if( current == null ) {
                        parent.right = n;
                        break;
                    }
                }
            }
        }
    },
    // find min
    getMin : function() {
        var current = this.root;
        if( !(current.left == null) ) {
            current = current.left;
        }
        return current.data;
    },
    // find max
    getMax : function() {
        var current = this.root;
        if( !(current.right == null) ) {
            current = current.right;
        }
        return current.data;
    },
    // find data
    find : function(data) {
        var current = this.root;
        while( current!=null ) {
            if( current.data == data ) {
                return current;
            }else if( data < current.data ) {
                current = current.left;
            }else {
                current = current.right;
            }
        }
        return null;
    },
    remove : function(data) {
        root = removeNode(this.root, data);
    },
    removeNode : function(node, data) {
        if( node == null ) {
            return null;
        } 
        if( data == node.data ) {
            // 没有子节点的节点
            if( node.left == null && node.right == null ) {
                return null;
            }
            // 没有左子节点的节点
            if( node.left == null ) {
                return node.right;
            }
            // 没有右子节点的节点
            if( node.right == null ) {
                return node.left;
            }
            var tempNode = node.right.getMin();
            node.data = tempNode.data;
            node.right = removeNode(node.right, tempNode.data);
            return node;
        }else if( data < node.data ) {
            node.left = removeNode(node.left, data);
            return node;
        }else {
            node.right = removeNode(node.right, data);
            return node;
        }
    }
})

// 中序遍历
function inOrder(node) {
    if( !(node == null) ) {
        inOrder(node.left);
        console.log( node.show() +' ');
        inOrder(node.right)
    }
}

// 先序遍历
function preOrder(node) {
    if( !(node == null) ) {
        console.log( node.show() + '');
        preOrder(node.left);
        preOrder(node.right);
    }
}

// 后序遍历
function postOrder(node) {
    if( !(node == null) ) {
        postOrder(node.left);
        postOrder(node.right);
        console.log( node.show() + '');
    }
}