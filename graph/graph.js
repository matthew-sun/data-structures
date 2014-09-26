/**
 * 顶点
 */
var Vertex = Class({
    init : function(label) {
        this.label = label;
    }
})

/**
 * 图
 * 图由边的集合和边的顶点集合
 */
var Graph = Class({
    init : function(v) {
        this.setup(v);
    },
    setup : function(v) {
         this.vertices = v;
         this.edges = 0;
         this.adj = [];
         for(var i=0; i<this.vertices; i++) {
            this.adj[i] = [];
            this.adj[i].push("");
         }
         this.marked = [];
         for(var i=0; i<this.vertices; i++) {
            this.marked[i] = false;
         }
         this.edgeTo = [];
    },
    addEdge : function(v, w) {
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.edges++;
    },
    showGraph : function() {
        var str = '';
        for( var i=0; i<this.vertices; i++) {
            str += i + "->";
            for( var j=0; j<this.vertices; j++) {
                if(this.adj[i][j] != undefined)
                    str += this.adj[i][j] + ' ';
            }
            str += '\n';
        }
        console.log(str);
    },
    // 深度优先搜索
    dfs : function(v) {
        this.marked[v] = true;
        if( this.adj[v] != undefined ) {
            console.log('Visited vertex:' +v);
        }
        for(var w in this.adj[v]) {
            if(!this.marked[w]) {
                this.dfs(w)
            }
        }
    },
    // 广度优先搜索
    bfs : function(s) {
        var queue = [];
        this.marked[s] = true;
        queue.push(s);
        while (queue.length > 0) {
            var v = queue.shift(); // 从队首移除
            if( v == undefined) {
                console.log('Visited vertex:' +v);
            }
            for(var w in this.adj[v]) {
                if(!this.marked[w]) {
                    this.edgeTo[w] = v;
                    this.marked[w] = true;
                    queue.push(w);
                }
            }
        }
    },
    pathTo : function(v) {
        var source = 0;
        if(!this.hasPathTo(v)) {
            return undefined;
        }
        var path = [];
        for (var i=v; i !=source; i=this.edgeTo[i]){
            path.push(i);
        }
        path.push(s);
        return path;
    },
    hasPathTo : function(v) {
        return this.marked[v];
    }
})