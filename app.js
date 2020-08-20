const canvas = document.getElementById("graph");
const ctx    = canvas.getContext('2d');
let height = window.innerHeight - 100;
let width  = window.innerWidth - 300;
let gridSize = 20;
const algebra = document.getElementById('algebra');
const algebraBtn = document.getElementById('algbBtn');
const span = document.getElementById('equation');
canvas.height = height;
canvas.width  = width;
window.addEventListener('resize',()=>{
    canvas.height = window.innerHeight - 100;
    canvas.width  = window.innerWidth - 300;
    init();
});
let vlines = 0;
let hlines = 0;
let sine = false,cosine = false, tan = false,algb = true;
// Evaluate Expression
document.getElementById('sin').addEventListener('click',()=>
{
    span.textContent = 'SinX';
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.closePath();
    algb = false;
    sine = true;
    cosine = false;
    tan = false;
    init();
});
document.getElementById('cos').addEventListener('click',()=>{
    span.textContent = 'CosX';
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    algb = false;
    sine = false;
    cosine = true;
    tan = false;
    init();
});
document.getElementById('tan').addEventListener('click',()=>{
    span.textContent = 'TanX';
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    algb = false;
    sine = false;
    cosine = false;
    tan = true;
    init();
});
function drawGrid()
{
    let yPlot = gridSize;
    let xPlot = gridSize;
    ctx.clearRect(0, 0, width, height);
    while(yPlot<=canvas.height)
    {
        ctx.beginPath();
        ctx.moveTo(0, yPlot);
        ctx.lineTo(canvas.width,yPlot);
        ctx.strokeStyle = 'gray';
        ctx.stroke();
        ctx.closePath();
        yPlot+=gridSize;
        vlines++;
    }
    while(xPlot<=canvas.width)
    {
        ctx.beginPath();
        ctx.moveTo(xPlot,0);
        ctx.lineTo(xPlot,canvas.height);
        ctx.strokeStyle = 'gray';
        ctx.stroke();
        ctx.closePath();
        xPlot+=gridSize;
        hlines++;
    }
}
function blocks(n)
{
    return n * gridSize;
}
function drawAxes()
{
    // Y- Axis
    ctx.beginPath();
    ctx.moveTo((Math.floor(hlines/2)*gridSize),0);
    ctx.lineTo((Math.floor(hlines/2)*gridSize),(canvas.height));
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    // X - Axis
    ctx.beginPath();
    ctx.moveTo(0,Math.floor(vlines/2)*gridSize);
    ctx.lineTo(canvas.width,Math.floor(vlines/2)*gridSize);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
}
function xCoord()
{
    ctx.moveTo(0,0);
    ctx.beginPath();
    for(var i=-vlines;i<=vlines;i++)
    {
        ctx.font = '10px Arial';
        ctx.arc(i*gridSize,0,2,0,2*Math.PI,false);
        ctx.fillStyle = 'black';
        ctx.fillText(i.toString(),i*gridSize,gridSize);
        ctx.fill();
    }
    ctx.closePath();
}
function yCoord()
{
    ctx.moveTo(0,0);
    ctx.beginPath();
    for(var i=-hlines;i<=hlines;i++)
    {
        if(i!==0)
        {
            ctx.font = '10px Arial';
            ctx.arc(0,i*gridSize,2,0,2*Math.PI,false);
            ctx.fillStyle = 'black';
            ctx.fillText(i.toString(),-gridSize + 3,i*gridSize);
            ctx.fill();
        }
    }
    ctx.closePath();
}
var amp;
let y=0,counter=0;
let increase = 90/180*Math.PI/9;
function drawTrigoGraph()
{
    ctx.save();
    ctx.translate((Math.floor(hlines/2)*gridSize),Math.floor(vlines/2)*gridSize);
    ctx.beginPath();
    for(var i=-50;i<50;i+=Math.PI/180)
    {
       ctx.lineWidth = 1;
       if(sine)
    {
        y = Math.round(parseFloat((Math.sin(i)*gridSize).toPrecision(3)));
    }
       else if(cosine)
    {
        y = Math.round(parseFloat((Math.cos(i)*gridSize).toPrecision(3)));
    }
       else if(tan)
    {
        y = Math.round(parseFloat((Math.tan(i)*gridSize).toPrecision(3)));
    }
       ctx.lineTo(i*gridSize,-(2*y));
       ctx.strokeStyle = 'red';
       ctx.lineJoin = 'round';
       ctx.stroke();
    }
    ctx.closePath();
}
function init()
{
    hlines = 0;
    vlines = 0;
    drawGrid();
    drawAxes();
    if(algb)
    {
        drawAlgebraGraph();
    }
    else if(sine || cosine || tan)
    {
        drawTrigoGraph();
    }
    xCoord();
    yCoord();
    ctx.restore();
}
let eqn = [];
let value;
let points = [];
let x = 0;
let i=0,j=0;
algebra.addEventListener("input",(e)=>{
value = algebra.value;
if(value.indexOf('*')!==-1)
{
    for(x=-50;x<50;x++)
{
    let ypt = eval(value);
    points[i] = {x:x,y:ypt};
    i++
}
i=0;
}
else if(value.indexOf('*') == -1)
{
    eqn = algebra.value.split('x');
    if(eqn[0] == '')
    {
        value ='x' + eqn[1];
    }
    else
    {
        value = eqn[0] + '*x' + eqn[1];
    }
    for(x=-50;x<50;x++)
    {
        let ypt = eval(value);
        points[j] = {x:x,y:ypt};
        j++;
    }
    j=0;
}
});
algebraBtn.addEventListener("click",()=>{
    algb = true;
    sine = false,tan = false, cosine= false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.closePath();
    init();
});
function drawAlgebraGraph()
{
    span.textContent = value;
    ctx.save();
    ctx.translate((Math.floor(hlines/2)*gridSize),Math.floor(vlines/2)*gridSize);
    ctx.beginPath();
    for(var i=0;i<points.length;i++)
    {
        ctx.lineTo(points[i].x*gridSize,-points[i].y*gridSize);
        ctx.strokeStyle = 'red';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }
    ctx.closePath();
}
init();