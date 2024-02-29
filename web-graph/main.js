let dir = "file:///H:/.bmstu/DS/web-graph/Params.txt"
let vals = []; let names = []; let values = [];
var chartList; var xTitle; var yTitle;
var canvas = window.document.getElementById("graph-canvas");
var context = canvas.getContext('2d');

function destroyOpts(id) {
    let select = window.document.getElementById(id);
    for (let i = names.length - 2; i > -1; i--) {
        select.removeChild(select.children[i]);
    }
}

function newDir() {
    destroyOpts("xSelect");
    destroyOpts("ySelect");
    let dir = window.document.getElementById("filename").value;
    vals.length = 0;
    names.length = 0;
    values.length = 0;
    if (Chart.getChart(context) != undefined) {
        Chart.getChart(context).destroy();
    }
    getTextFromFile(dir);
}

function setSelect(id) {
    let select = window.document.getElementById(id);
    for (let i = 0; i < names.length-1; i++){
        var opt = document.createElement('option')
        opt.value = i;
        opt.innerHTML = names[i];
        select.appendChild(opt);
    }
}

function createNewLi(newId, xId, yId) {
    var newLi = window.document.createElement('li');
    newLi.innerHTML = "<p class='chartName'>"+names[yId]+"("+names[xId]+") <button onclick='deleteChart("+newId+")'>Delete</button></p><p>Line <input id='borderColor"+newId+"' type='color' value='#de1b4f' onchange='changeChartColor("+newId+");'/> Width <input id='borderWidth"+newId+"' type='number' min='1' max='9' step='1' value='2' onchange='changeChartWidth("+newId+");'/> Tension <input id='tension"+newId+"' type='range' max='1.0' min='0.0' value='0.0' step='0.1' onchange='changeChartTension("+newId+")'/></p><p>Point-size <input id='pointSize"+newId+"' type='number' min='0' max='8' step='1' onchange='changeChartPointSize("+newId+")' value='0'/> Pointer <select id='pointer"+newId+"' onchange='changeChartPointer("+newId+")'><option value='circle'>circle</option><option value='cross'>cross</option><option value='crossRot'>crossRot</option><option value='dash'>dash</option><option value='line'>line</option><option value='rect'>rect</option><option value='rectRot'>rectRot</option><option value='star'>star</option><option value='triangle'>triangle</option></select></p><p>Line-type <select id='lineType"+newId+"' onchange='changeChartLineType("+newId+")'><option value=''>-</option><option value='10,10'>--</option><option value='15,3,3,3'>.-.</option><option value='15,3,3'>-. -.</option></select></p>";
    borderColors.push('#de1b4f');
    chartList.appendChild(newLi);
}

function newGraph() {
    let xId = window.document.getElementById("xSelect").value;
    let yId = window.document.getElementById("ySelect").value;
    if (Chart.getChart(context) != undefined) {
        Chart.getChart(context).destroy();
    }
    createNewLi(chartList.children.length + 1, xId, yId);
    newChart(chartList.children.length, xId, yId);
}

function getFloatsFromLines(text) {
    lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let val = [];
        if (i == 0){
            names = lines[i].split('|');
        }
        else {
            line = lines[i].split('|');
            for (let j=0;j<line.length-1; j++){
                val.push(parseFloat(line[j])); 
            }
            vals.push(val);
        }
    }
    for (let i = 0; i < vals[0].length; i++) {
        values.push([]);
        for (let j = 0; j < vals.length; j++) {
            values[i].push(vals[j][i]);
        }
    }
    setSelect("ySelect");
    window.document.getElementById("ySelect").value = 1;
    setSelect("xSelect");
    window.document.getElementById("xSelect").value = 0;
    newGraph(1,0,1);
}

function getTextFromFile(filename) {
    var req = new XMLHttpRequest();
    req.open("GET", filename);
    req.onload = function() {
        getFloatsFromLines(req.responseText);
    }
    req.send(null);
}