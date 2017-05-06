var width = 3000,
    height = 3000,
    win = $(window),
    winHeight = win.height(),
    winWidth = win.width(),
    totalNodeNum = 100,
    graph,attack,tip,
    orgData,colorMap;

scrollToCenter(width/2, height/2);
buildGraph();
bindSelector();

function buildGraph(){

    colorMap = {
        'normal': '#229e00',
        'infected': '#ff7070'
    };

    orgData = (new Graph(totalNodeNum)).generate();

    $('.container').empty();

    graph = new D3Config({
        width: width,
        height: height,
        data : orgData,
        container: '.container'
    });
    
    attack = new Attack(graph,orgData); 
    
}

function scrollToCenter(x,y) {
    $('html, body').animate({
        scrollTop: y - winHeight/2,
        scrollLeft: x - winWidth/2
    }, 200);
}

function bindSelector() {
    var select = $('#attack-type'),
        self = this;
    select.on('change', function(e){
        self.type = this.value;
        attack.setType(self.type);
    });
}

function highlightNode(node) {
    if(!node) return;
    scollToCenter(node.x, node.y);
    graph.highlight(node);
}
