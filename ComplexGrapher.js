/*
Copyright © 2020 <BalaM314>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

--------------------------------------------------
This is a program that graphs complex functions.
*/


var mode = "GRAPH";//Change this to "MOUSE" to just graph the current mouse location. Useful if you want to learn about a complex function.



var w = new Complex(3, 596);
var z = new Complex(-4, 9);



var transformation = transformation1;//The function to be graphed.

//These functions take a complex number and output one.
function transformation1(w){
  if(typeof w == "number"){
    w = new Complex(w, 0);
  }
  return w.mult(w);
}
function transformation3(w){
  if(typeof w == "number"){
    w = new Complex(w, 0);
  }
  return w.mult(w).mult(w);
}
function transformation2(w){
  if(typeof w == "number"){
    w = new Complex(w, 0);
  }
  return w.mult(w);
}
function transformationi(w){
  if(typeof w == "number"){
    w = new Complex(w, 0);
  }
  return w.mult(new Complex(0, 1));
  //return new Complex(1, 0).div(w);
}

//Variables for the graph:
var xMin = canvas.width/-2;
var currentColumn = xMin;
var xMax = canvas.width/2;
var yMin = canvas.height/-2;
var yMax = canvas.height/2;
var stepX = 20;
var stepY = 20;
var frames = 0;

//Graphs, one column at a time.
function graphOneColumn(){
  frames ++;

  //Draw the graph axes
  ctx.strokeStyle = "#ffffff";
  line((xMax-xMin)/2, 0, (xMax-xMin)/2, (yMax-yMin));
  line(0, (yMax-yMin)/2, (xMax-xMin), (yMax-yMin)/2);

  if(frames % 2 == 0){//Slow down
    if(currentColumn > xMax){//End condition
      return;
    }
    for(let j = yMin; j < yMax; j += stepY){
      let w = new Complex(currentColumn, j);
      let z = transformation(w);
      //Maps the complex numbers' values from coordinates on the graph to coordinates on the canvas
      p1 = {x: map(w.a, xMin, xMax, 0, canvas.width), y: map(w.b, yMin, yMax, canvas.height, 0)};
      p2 = {x: map(z.a, xMin, xMax, 0, canvas.width), y: map(z.b, yMin, yMax, canvas.height, 0)};

      c = colorPos(w.a, w.b);//Provides a color value
      ctx.strokeStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
      line(p1.x, p1.y, p2.x, p2.y);//The actual graphing is all in here!
      ellipse(p1.x, p1.y, 5, 5);
      ellipse(p2.x, p2.y, 5, 5);
    }
    currentColumn += stepX;
  }
  requestAnimationFrame(graphOneColumn);//Technically recursion?
}

//The old function that graphs everything at once. Bit laggy; not optimized.
function graph(transformation, xMin = -300, xMax = 300, yMin = -300, yMax=300, stepX = 20, stepY = 20){
  for(let i = xMin; i < xMax; i += stepX){
    for(let j = yMin; j < yMax; j += stepY){
      let w = new Complex(i, j);
      let z = transformation(w);
      p1 = {x: map(w.a, xMin, xMax, 0, canvas.width), y: map(w.b, yMin, yMax, canvas.height, 0)};
      p2 = {x: map(z.a, xMin, xMax, 0, canvas.width), y: map(z.b, yMin, yMax, canvas.height, 0)};
      c = colorPos(w.a, w.b);
      ctx.strokeStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
      line(p1.x, p1.y, p2.x, p2.y);
      ellipse(p1.x, p1.y, 5, 5);
      ellipse(p2.x, p2.y, 5, 5);
    }
  }
  line((xMax-xMin)/2, 0, (xMax-xMin)/2, (yMax-yMin));
  line(0, (yMax-yMin)/2, (xMax-xMin), (yMax-yMin)/2);
}


//Just graphs one point.
function graphOnce(transformation, x, y, xMin = -300, xMax = 300, yMin = -300, yMax=300){
  let w = new Complex(x, y);
  let z = transformation(w);
  //ctx.strokeStyle = `rgb(164, ${map(x, xMin, xMax, 0, 255)}, ${map(y, xMin, xMax, 0, 255)})`;
  p1 = {x: map(w.a, xMin, xMax, 0, canvas.width), y: map(w.b, yMin, yMax, canvas.height, 0)};
  p2 = {x: map(z.a, xMin, xMax, 0, canvas.width), y: map(z.b, yMin, yMax, canvas.height, 0)};
  c = colorPos(w.a, w.b);
  ctx.strokeStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
  line(w.a + 300, w.b*-1 + 300, z.a + 300, z.b*-1 + 300);
  ellipse(w.a + 300, w.b*-1 + 300, 5, 5);
  text(`X:${round(w.a)} Y:${round(w.b)}`, w.a + 300, w.b*-1 + 300);
  ellipse(z.a + 300, z.b*-1 + 300, 5, 5);
  text(`X:${round(z.a)} Y:${round(z.b)}`, z.a + 300, z.b*-1 + 300);
}


function loop(){
  background(255, 255, 255);
  fill(0, 0, 0);
  ctx.strokeStyle = "rgb(0, 0, 0)";
  line((canvas.width)/2, 0, (canvas.width)/2, (canvas.height));
  line(0, (canvas.height)/2, (canvas.width), (canvas.height)/2);
  graphOnce(transformation3, map(mouseX, 0, 600, -300, 300), map(mouseY, 0, 600, 300, -300));
  ctx.strokeStyle = "rgb(0, 0, 0)";
  //text(`X:${mouseX} Y:${mouseY}`, 300, 300);
  cancelId = requestAnimationFrame(loop);
}
//var cancelId = requestAnimationFrame(loop);
function noLoop(){
  cancelAnimationFrame(cancelId);
}
ctx.lineWidth = 1;

function moveCursor(x, y){//Moves the cursor to specific coordinates.
  mouseX = map(x, -300, 300, 0, 600);
  mouseY = map(y, -300, 300, 600, 0);
  window.onmousemove = null;
}

function load(){
  transformation = transformation2;
  xMin = canvas.width/-2;
  currentColumn = xMin;
  xMax = canvas.width/2;
  yMin = canvas.height/-2;
  yMax = canvas.height/2;
  //graph(transformationi, canvas.width/-2, canvas.width/2, canvas.height/-2, canvas.height/2, 20, 20)
  ctx.fillStyle = "#000000";
  ctx.fillRect(-1, -1, canvas.width, canvas.height);
  graphOneColumn();
}


if(mode == "GRAPH"){
  load();
} else if(mode == "MOUSE"){
  loop();
}
