// require lodash
;(function(exports) {

function Graph(n){
    this.nodeNum = n;
}

_.extend(Graph.prototype, {
    generate: function() {
        this.adj = [];
        this.k = [];
        this.generateAdjMatrix(this.nodeNum);

        this.generateNodes(this.nodeNum);
        this.generateLinks(this.nodeNum);

        //console.log(this.nodes);
        //console.log(this.links);

        return {
            nodes: this.nodes,
            links: this.links
        };
    },

    generateAdjMatrix: function(n) {
        var i,j,flag = 0,sumK = 2;
        var pi=[];

        for(i=0;i<n;i++) {
            this.adj[i] = [];
            pi[i] = this.k[i] = 0;
            for(j=0;j<n;j++){
                this.adj[i][j] = 0;
            }
        }

        this.adj[0][1] = this.adj[1][0] = 1;
        pi[0] = pi[1] = 0.5;
        this.k[0] = this.k[1] = 1;

        for(i=2;i<n;i++){
            while (flag == 0){
                for(j=0;j<i-1;j++){
                    if(Math.random() < pi[j]){
                        this.adj[i][j] = this.adj[j][i] = 1;
                        this.k[i]++;
                        this.k[j]++;
                        sumK = sumK + 2;
                        flag++;
                    }
                }
            }

            flag = 0;

            for(j=0; j<i; j++){
                pi[j] = this.k[j]/sumK;
            }
        }
    },//end of generateAdjMatrix

    generateNodes: function(n){
        var nodes = [];
        
        for(var j=0;j<n;j++){
        //_.forEach(this.adj, function(arr){
            
            var neighbors = [];
            for(var i=0;i<n;i++){
                if (this.adj[j][i] == 1) {
                    neighbors.push(i);
                }
            }
            nodes.push({
                neighbors: neighbors,
                degree: neighbors.length,
                state: 'normal',
                index: j
            });
        //},this);
        }

        this.nodes = nodes;
    },

    generateLinks: function(n) {
        this.links = [];
        var i,j,k=0;

        for(i=0;i<n;i++){
            for(j=i+1;j<n;j++){
                if(this.adj[i][j] == 1){
                    this.links.push({
                        source: i,
                        target: j,
                        index: k
                        //sourceNode: this.nodes[i],
                        //targetNode: this.nodes[j]
                    });
                    k++;
                }
            }
        }
    }
});

exports.Graph = Graph;
}(window))
