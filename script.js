var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius = canvas.height / 2;
context.translate(radius,radius);
radius = radius * 0.9;                  // So that clock should be drawn inside the canvas.
setInterval(drawClock,1000);

function drawClock()
{
    clockFace(context, radius);
    addNumbers(context, radius);
    addTime(context, radius);
}

function clockFace(context, radius)
{
    var grad;
    context.beginPath();
    context.arc(0,0,radius,0,2*Math.PI);
    context.fillStyle = "#fbff00";
    context.fill();
    grad = context.createRadialGradient(0,0,radius*0.95,0,0,radius*1.05);
    grad.addColorStop(0,"#1b4700");
    grad.addColorStop(0.5,"#a8ff73");
    grad.addColorStop(1,"#1b4700");
    context.strokeStyle = grad;
    context.lineWidth = radius * 0.1;
    context.stroke();
    context.beginPath();
    context.arc(0,0,radius*0.1,0,2*Math.PI);
    context.fillStyle = "#4d0005";
    context.fill();
}

function addNumbers(context, radius)
{
    var ang,num;             // angle and numbers
    context.font = radius*0.15 + "px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    for(num=1; num<=12; num++)
    {
        ang = num * Math.PI/6;
        context.rotate(ang);
        context.translate(0, -radius*0.85);
        context.rotate(-ang);
        context.fillText(num.toString(),0,0);
        context.rotate(ang);
        context.translate(0, radius*0.85);
        context.rotate(-ang);
    }
}

function addTime(context, radius)
{
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    hours = hours % 12;
    hours = (hours*Math.PI/6) + (minutes*Math.PI/(6*60)) + (seconds*Math.PI/(6*60*60));
    drawHand(context, hours, radius*0.6, radius*0.05);

    minutes = (minutes*Math.PI/30) + (seconds*Math.PI/(30*60));
    drawHand(context, minutes, radius*0.8, radius*0.06);

    seconds = (seconds*Math.PI/30);
    drawHand(context, seconds, radius*0.9, radius*0.02);
}

function drawHand(context, position, length, width)
{
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = "round";
    context.moveTo(0,0);
    context.rotate(position);
    context.lineTo(0, -length);               // Draw the next point and creates a line between that point to the last specified point in canvas.
    context.stroke();                     // Draw the Path in canvas.
    context.rotate(-position);
}
