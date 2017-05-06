;(function(exports){

function Attack(graph, org) {
    this.graph = graph;
    this.type = 'none';
    this.step = 0;
    this.org = org;
    this.sortedNodes = _.sortBy(org.nodes,function(d){return d.degree;});
    this.nodes = graph.graphData.nodes;
    this.links = graph.graphData.links;
    this.infectedNodes = [];

    this.setType = function(type){
        this.type = type;
        $('span.type').html(this.type);
        $('span.step').html(this.step);
        $('.tip-container').css('visibility','visible');

        var i,index;
        switch(this.type){
            case "none":
                clearTimeout(this.attackTimer);
                d3.select('svg').remove();
                this.step = 0;
                window.graph = new D3Config({width:3000,height:3000,data:org,container:'.container'});
                d3.selectAll('circle').style('fill',colorMap['normal']);
                $('.tip-container').css('visibility','hidden');
                this.infectedNodes = [];
                this.nodes = graph.graphData.nodes;
                this.links = graph.graphData.links;
                break;
            case "random failure":
                this.attackTimer = setTimeout(randomAttack,1000);
                break;
            case "intentional":
                this.attackTimer = setTimeout(intentional,1000);
                break;
            case "one-neighbor":
            {
                i=Math.floor(Math.random()*this.nodes.length);
                index=this.nodes[i].index;
                this.nodes[i].state = 'infected';
                d3.select('.node[index="'+index+'"]').attr('state','infected').select('circle').style("fill",window.colorMap[this.nodes[i].state]);
                this.infectedNodes.push(this.nodes[i]);
                this.attackTimer = setTimeout(oneNeighbor,1000);
                break;
            }
            case "p-neighbor":
            {
                i=Math.floor(Math.random()*this.nodes.length);
                index=this.nodes[i].index;
                this.nodes[i].state = 'infected';
                d3.select('.node[index="'+index+'"]').attr('state','infected').select('circle').style("fill",window.colorMap[this.nodes[i].state]);
                this.infectedNodes.push(this.nodes[i]);
                this.attackTimer = setTimeout(pNeighbor,1000);
                break;
            }
            default:
                break;
        }
    };

    function oneNeighbor(){
        this.attack.step++; 
        var i,index,newInfectedNode,line;

        _.forEach(attack.infectedNodes, function(node){
            do{
                if(node.neighbors.length == 0)
                    break;
                i = Math.floor(Math.random()*node.neighbors.length);
                index = node.neighbors[i];
                line = _.find(attack.links,function(l){
                    return (l.source.index == node.index && l.target.index == index)||
                           (l.source.index == index && l.target.index == node.index);
                });

                _.remove(node.neighbors, function(num){return num == index;});
            }//while(newInfectedNode.state == 'infected');
            while(!line);

            newInfectedNode = attack.nodes[index];
            newInfectedNode.state = 'infected';
            _.remove(newInfectedNode.neighbors, function(num){return num == node.index;});
            d3.select('.node[index="'+index+'"]').attr('state','infected').select('circle').style('fill',colorMap[newInfectedNode.state]);
            //console.log('source='+node.index);
            //console.log('target='+index);
            d3.select('.link[index="'+line.index+'"]').classed('infected',true);
            attack.infectedNodes.push(newInfectedNode);
        });

        graph.force.start();

        _.remove(attack.infectedNodes, function(n){return n.neighbors.length == 0;});

        var nodelen = d3.selectAll('.node[state="normal"]')[0].length,
            limit = attack.nodes.length,
            link = limit - d3.selectAll('line.infected')[0].length;
        
        refreshTip(nodelen,link);

        if(link>limit*0.3)
            attack.attackTimer = setTimeout(oneNeighbor,1000);
    }

    function pNeighbor(){
        this.attack.step++; 
        var i,index,newInfectedNode,line;

        _.forEach(attack.infectedNodes, function(node){
            i=0;
            //console.log('node='+node.index);
            //console.log('len='+node.neighbors.length);
            while(i<node.neighbors.length){
                index = Math.random();
                //console.log('random='+index);
                //console.log('i='+i);
                if(index>0.9){
                    index = node.neighbors[i];
                    line = _.find(attack.links,function(l){
                        return (l.source.index == node.index && l.target.index == index)||
                                (l.source.index == index && l.target.index == node.index);
                    });
                    _.remove(node.neighbors, function(num){return num == index;});
                    newInfectedNode = attack.nodes[index];
                    newInfectedNode.state = 'infected';
                    _.remove(newInfectedNode.neighbors, function(num){return num == node.index;});
                    d3.select('.node[index="'+index+'"]').attr('state','infected').select('circle').style('fill',colorMap[newInfectedNode.state]);
                    d3.select('.link[index="'+line.index+'"]').classed('infected',true);
                    attack.infectedNodes.push(newInfectedNode);
                } else {
                    i++;
                }
            }
        });

        graph.force.start();

        _.remove(attack.infectedNodes, function(n){return n.neighbors.length == 0;});

        var nodelen = d3.selectAll('.node[state="normal"]')[0].length,
            limit = attack.nodes.length,
            link = limit - d3.selectAll('line.infected')[0].length;
        
        refreshTip(nodelen,link);

        if(link>limit*0.3)
            attack.attackTimer = setTimeout(pNeighbor,1000);
    }

    function intentional(){
        this.attack.step++;
        var svg = d3.select('svg');
        var node = this.attack.sortedNodes.length;
                //console.log('node='+node.length);
        //var i = Math.floor(Math.random()*node);
                //console.log('i='+i);
        var index = this.attack.sortedNodes.pop().index;
                //console.log('index='+index);

        svg.select('.node[index="'+index+'"]').remove();
        svg.selectAll('.link[source="'+index+'"]').remove();
        svg.selectAll('.link[target="'+index+'"]').remove();
        this.graph.force.start();
                
        var limit = this.graph.graphData.links.length*0.3,
            link = svg.selectAll('.link')[0].length;
                
        refreshTip(node,link);

        if(link>limit)
            this.attack.attackTimer = setTimeout(intentional,1000);

    }

    function randomAttack(){
        this.attack.step++;
        var svg = d3.select('svg');
        var node = svg.selectAll('.node')[0].length;
                //console.log('node='+node[0].length);
        var i = Math.floor(Math.random()*node);
                //console.log('i='+i);
        var index = svg.selectAll('.node')[0][i].attributes['index'].value;
                //console.log('index='+index);

        svg.select('.node[index="'+index+'"]').remove();
        svg.selectAll('.link[source="'+index+'"]').remove();
        svg.selectAll('.link[target="'+index+'"]').remove();
        this.graph.force.start();
                
        var limit = this.graph.graphData.links.length*0.3,
            link = svg.selectAll('.link')[0].length;
                                
        refreshTip(node,link);

        if(link>limit)
            this.attack.attackTimer = setTimeout(randomAttack,1000);
    }
        
    function refreshTip(node,link){
        $('span.step').html(this.attack.step);
        $('span.avgDegree').html(link/node/2);
        $('span.links').html(link);
        $('span.nodes').html(node);
    }
}

exports.Attack = Attack;
}(window))
