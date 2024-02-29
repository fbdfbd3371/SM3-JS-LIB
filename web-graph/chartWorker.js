var config = {}; var data = {}; var datasets = [];
var borderColors = ["#de1b4f"];

var newChart = (chartId, xId, yId) => {
    let xyData = [];   
    window.document.getElementById('saveFileName').value = names[yId] + '(' + names[xId] + ')';
    if (chartId == 0) {
        return;
    }
    for (let i = 0; i < values[xId].length; i++) {
        xyData.push({x:values[xId][i], y:values[yId][i]});
    }

    dset = {label: (names[yId]+' ('+names[xId]+')'), 
            data: xyData,
            borderWidth: window.document.getElementById('borderWidth'+chartId).value,
            showLine: true,
            borderColor: borderColors[chartId-1],
            tension: window.document.getElementById('tension'+chartId).value,
            pointStyle: window.document.getElementById('pointer'+chartId).value.toString(),
            borderDash: [],
            pointBackgroundColor: borderColors[chartId-1],
            pointRadius: window.document.getElementById('pointSize'+chartId).value,
            pointHoverRaius: 0
    };
    datasets.push(dset);

    updateChart();
} 

function updateChart() {
    xTitle = window.document.getElementById('labelX').value;
    yTitle = window.document.getElementById('labelY').value;
    if (Chart.getChart(context) != undefined) {
        Chart.getChart(context).destroy();
    }
    data = {
        datasets: datasets
    };
    config = {
        type: 'scatter',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: Boolean(window.document.getElementById('showLegend').value),
                    labels: {
                        boxHeight: 1,
                        boxWidth: 30,
                        font: {
                            size: window.document.getElementById('sizeLegend').value,
                            family: 'Times New Roman'
                        },
                        color: window.document.getElementById('colorLegend').value,
                    }
                }
            },
            scales: {
                x: {
                    title:{
                        display: true,
                        text: xTitle,
                        color: window.document.getElementById('colorLegend').value,
                        font: {
                            size: window.document.getElementById('sizeLegend').value,
                            family: 'Times New Roman' 
                        }
                    },
                    ticks: {
                        color: window.document.getElementById('colorLegend').value,
                        font: {
                            size: window.document.getElementById('sizeLegend').value,
                            family: 'Times New Roman' 
                        } 
                    }
                },
                y: {
                    title:{
                        display: true,
                        text: yTitle,
                        color: window.document.getElementById('colorLegend').value,
                        font: {
                            size: window.document.getElementById('sizeLegend').value,
                            family: 'Times New Roman' 
                        }
                    },
                    ticks: {
                        color: window.document.getElementById('colorLegend').value,
                        font: {
                            size: window.document.getElementById('sizeLegend').value,
                            family: 'Times New Roman' 
                        } 
                    }
                },
            }
        }
    }
    canvas = window.document.getElementById("graph-canvas");
    context = canvas.getContext('2d');
    chart = new Chart(context, config);
}

function clearGraph() {
    datasets = [];
    if (Chart.getChart(context) != undefined) {
        Chart.getChart(context).destroy();
    }
    xTitle=undefined;yTitle=undefined;
    newChart(0,0,0);
    xTitle=undefined;yTitle=undefined;
    for (let i = chartList.children.length-1; i > -1; i --) {
        chartList.removeChild(chartList.children[i]);
    }
    borderColors = [];
    window.document.getElementById('saveFileName').value = 'None';
}

function deleteChart(id) {
    for (let i = id; i < datasets.length; i++){
        datasets[i-1] = datasets[i];
        chartList.removeChild(chartList.children[id-1]);
        lines = chartList.children[id-1].children[0].innerText.split('(');
        yName = lines[0];
        xName = lines[1].split(')')[0];
        console.log(xName+' '+yName);
        for (let j = 0; j < names.length; j++) {
            if (names[j] == yName) {
                yId = j;
            }
            if (names[j] == xName) {
                xId = j;
            }
        }
        createNewLi(i, xId, yId)
        window.document.getElementById('borderColor'+i).value = datasets[i].borderColor;
        window.document.getElementById('tension'+i).value = datasets[i].tension;
        window.document.getElementById('pointSize'+i).value = datasets[i].pointRadius;
        window.document.getElementById('pointer'+i).value = datasets[i].pointStyle;
        window.document.getElementById('lineType'+i).value =  datasets[i].borderDash;
    }
    chartList.removeChild(chartList.children[id-1]);
    datasets.length -= 1;
    updateChart();
}

function changeChartColor(id) {
    borderColors[id-1] = window.document.getElementById("borderColor"+id).value;
    datasets[id-1].borderColor = borderColors[id-1];
    datasets[id-1].pointBackgroundColor = borderColors[id-1];
    updateChart();
}

function changeChartWidth(id) {
    datasets[id-1].borderWidth = window.document.getElementById('borderWidth'+id).value;
    updateChart();
}

function changeChartTension(id) {
    datasets[id-1].tension = window.document.getElementById('tension'+id).value;
    updateChart();
}

function changeChartPointer(id) {
    datasets[id-1].pointStyle = window.document.getElementById('pointer'+id).value.toString();
    updateChart();
}

function changeChartPointSize(id) {
    datasets[id-1].pointRadius = window.document.getElementById('pointSize'+id).value;
    updateChart();
}

function changeChartLineType(id) {
    var line =  window.document.getElementById('lineType'+id).value;
    var lines = line.split(',');
    var seq = [];
    for (let i = 0; i < lines.length; i++) {
        seq.push(lines[i]);
    }
    datasets[id-1].borderDash = seq;
    updateChart();
}

function changeLegendTextSize() {
    updateChart();
}

function changeLegendTextColor() {
    updateChart();
}

function changeShowLegend() {
    if (window.document.getElementById('showLegend').value == '') {
        window.document.getElementById('showLegend').value = '1';
    }
    else{
        window.document.getElementById('showLegend').value = '';
    }
    updateChart();
}

function changeLabelX() {
   updateChart();
}

function changeLabelY() {
    updateChart();
}

function saveGrpah() {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = window.document.getElementById('saveFileName').value+'.png'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}