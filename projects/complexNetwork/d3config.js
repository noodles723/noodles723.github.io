// require d3
// require lodash

;(function(exports){

function D3Config(options){
    var width = options.width || 3000,
        height = options.height || 3000,
        graphData = options.data || orgData,
        container = options.container || $('.container'),
        self = this;

    var svg = d3.select(container).append('svg')
        .attr('width',width)
        .attr('height',height);

    /*var colorMap = {
        'normal': '#229e00'
    };*/

    var force, link, node;

    renderGraph();

    function renderGraph() {
        setForceLayout();
        setLinks();
        setNodes();
        nodeFollowForce();
        setTick();
        console.log("here");
    }

    function setForceLayout() {
        self.force = force = d3.layout.force()
            .gravity(0.1)
            .distance(100)
            .charge(-180)
            .size([width, height])
            .theta(0.1)
            .linkStrength(0.1);

        force.nodes(graphData.nodes)
            .links(graphData.links)
            .linkDistance(50)
            .start();
    }

    function setLinks() {
        var line = d3.svg.line.radial()
            .interpolate('bundle')
            .tension(0.85)
            .radius(function(d){return d.y;})
            .angle(function(d){return d.x/180*Math.PI;});

        var angle = d3.scale.ordinal().domain(d3.range(4)).rangePoints([0,2*Math.PI]),
            radius = d3.scale.linear().range([0,100]),
            color = d3.scale.category10().domain(d3.range(20));

        link = svg.selectAll('.link')
            .data(graphData.links)
            .enter().append('line')
            .attr('class','link')
            .attr('source',function(d){return d.source.index;})
            .attr('target',function(d){return d.target.index;})
            .attr('index', function(d){return d.index;});
    }

    function setNodes() {
        var circle, text;

        node = svg.selectAll('.node')
            .data(graphData.nodes)
            .enter().append('g')
            .attr('class','node')
            .attr('index', function(d){return d.index;})
            .attr('state','normal');

        circle = node.append('circle')
            .attr('class','circle')
            .attr('r',function(d){
                return Math.log(d.degree+2)*8;
            })
            .style('fill',function(d) { 
                return colorMap[d.state];
            });
        
        node.on('mouseover', mouseover);
        node.on('mouseout', mouseout);
    }
    
    function nodeFollowForce() {
        node.call(force.drag);
    }

    function setTick(){
        force.on('tick', function(){
            link.attr('x1', function(d){return d.source.x;})
                .attr('y1', function(d){return d.source.y;})
                .attr('x2', function(d){return d.target.x;})
                .attr('y2', function(d){return d.target.y;});

            node.attr('transform', function(d){return 'translate('+d.x+','+d.y+')';});
        });
    }

    function mouseover(d) {
        mouseout();

        svg.select('.node[index="'+d.index+'"]')
            .classed('highlight',true);

        svg.selectAll('.link[source="'+d.index+'"]')
            .classed('target',true);

        svg.selectAll('.link[target="'+d.index+'"]')
            .classed('target',true);

        for(var i=0;i<d.degree;i++){
            svg.select('.node[index="'+d.neighbors[i]+'"]')
                .classed('highlight',true);
        }
    }

    function mouseout(d) {
        svg.selectAll('.source').classed('source',false);
        svg.selectAll('.target').classed('target',false);
        svg.selectAll('.highlight').classed('highlight',false);
    }
    
    function resume() {
    
    }

    this.graphData = graphData;
    this.mouseout = mouseout;
    this.mouseover = mouseover;
    this.resume = renderGraph;
}

exports.D3Config = D3Config;
}(window))
