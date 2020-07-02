/*   Цивинская Анна, задание 2.1    */

var pict = document.getElementById("canvas");
var ctx = pict.getContext("2d");

class Graphics1d {
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 120 * 4,
    H = 100 * 4,
    f = function(x) {return x*x-9;}
  ) {
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.W = W;
    this.H = H;
    this.f = f;
    this.ev = 0;
  }
  evaluate() {
    let count = 0;
    var mxe = [this.f(this.xmin), this.f(this.xmax)];
    this.fvalues = new Float64Array(this.H * this.W);
    this.dots = new Array(this.H * this.W);
    for (let a = this.xmin; a <= this.xmax; a += (-this.xmin + this.xmax) / this.W) {
      this.dots[count] = a;
      this.fvalues[count++] = this.f(a);
      mxe[1]  = Math.max(this.fvalues[count - 1], mxe[1]);
      mxe[0]  = Math.min(this.fvalues[count - 1], mxe[0]);
    }
    this.ev = 1;
    return mxe;
  }
  draw(
    dots = "#FF4500", //red
    axis = "#9ACD32", //green
    zeros = "indigo",
    gaps = "magenta",
    bg = "#DCDCDC" //grey
  ) {
    pict.width = this.W;
    pict.height = this.H;
    var drawed = new Graphics1d();
    if (this.ev == 0) this.evaluate();
    let stepx = this.W / (-this.xmin + this.xmax);
    let stepy = this.H / (-this.ymin + this.ymax);
    let zerox = -(this.xmin) * stepx;
    let zeroy = this.ymax * stepy;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, g.W, g.H);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = axis;
    ctx.moveTo(0, zeroy);
    ctx.lineTo(g.W, zeroy);
    ctx.moveTo(zerox, 0);
    ctx.lineTo(zerox, g.H);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = axis;
    for (let i = 0; i <= g.W; i += stepx)
      for (let j = 0; j <= g.H; j += stepy) {
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i + stepx, j);
        ctx.lineTo(i + stepx, j + stepy);
        ctx.lineTo(i, j + stepy);
        ctx.closePath();
        ctx.stroke();
      }
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = dots;
    ctx.moveTo(zerox + this.xmin * stepx, zeroy - this.f(this.xmin) * stepy);
      for (let a = 0; a <= this.H * this.W; a++) {
      if (this.dots[a] != this.xmin) {
        let cur = this.fvalues[a];
        let prev = this.fvalues[a - 1];
        if (cur * prev <= 0) {
          if (Math.abs(cur - prev) > this.ymax - this.ymin) {
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = gaps;
            ctx.arc(
              zerox + this.dots[a] * stepx,
              zeroy - stepy * this.ymax,
              stepx / 10,
              0,
              180
            );
            ctx.arc(
              zerox + this.dots[a] * stepx,
              zeroy - stepy * this.ymin,
              stepx / 10,
              0,
              180
            );
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
          } else {
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = zeros;
            ctx.arc(zerox + this.dots[a] * stepx, zeroy, stepx / 10, 0, 180);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(zerox + this.dots[a - 1] * stepx, zeroy - this.fvalues[a - 1] * stepy);
            ctx.lineTo(zerox + this.dots[a] * stepx, zeroy - this.fvalues[a] * stepy);
          }
        } else {
          ctx.lineTo(zerox + this.dots[a] * stepx,zeroy - this.fvalues[a] * stepy);
        }
      }
    }
    ctx.stroke();
    ctx.closePath();
  }

  autodraw(
    dots = "#FF4500", //red
    axis = "#9ACD32", //green
    zeros = "indigo",
    gaps = "magenta",
    bg = "#DCDCDC" //grey
  ) {
    console.log(this.ymin, this.ymax);
    if (this.ev == 0) 
      var mx = this.evaluate();
    this.ymin = Math.min(mx[0],mx[1]) ;
    this.ymax = Math.max(mx[0],mx[1]);
    this.draw(dots, axis, zeros, gaps, bg);
    console.log(this.ymin, this.ymax);
  }
}
function replaceSequence(str){
 str = str.split("sin").join("Math.sin");
 str = str.split("cos").join("Math.cos");
 str = str.split("tan").join("Math.tan");
 str = str.split("asin").join("Math.asin");
 str = str.split("acos").join("Math.acos");
 str = str.split("atan").join("Math.atan");
 str = str.split("ln").join("Math.log");
 str = str.split("ln2").join("Math.LN2");
 str = str.split("ln10").join("Math.LN10");
 str = str.split("log2e").join("Math.LOG2E");
 str = str.split("lg").join("logab");
 str = str.split("log10e").join("Math.LOG10E");
 str = str.split("sqrt").join("Math.sqrt");
 str = str.split("sqrt2").join("Math.SQRT2");
 str = str.split("sqrt1_2").join("Math.SQRT1_2");
 str = str.split("pow").join("Math.pow");
 str = str.split("exp").join("Math.exp");
 str = str.split("max").join("Math.max");
 str = str.split("min").join("Math.min");
 str = str.split("abs").join("Math.abs");
 str = str.split("ceil").join("Math.ceil");
 str = str.split("floor").join("Math.floor");
 str = str.split("round").join("Math.round");
 str = str.split("pi").join("Math.PI");
 str = str.split("e").join("Math.E");
 return str;
}
var g = new Graphics1d();
g.draw();
function count(){
  var xmin = parseFloat(document.getElementById("xmin").value);
  var xmax = parseFloat(document.getElementById("xmax").value);
  var ymin = parseFloat(document.getElementById("ymin").value);
  var ymax = parseFloat(document.getElementById("ymax").value);
  var W = parseFloat(document.getElementById("W").value);
  var H = parseFloat(document.getElementById("H").value);
  var f = document.getElementById("f").value;
  f = replaceSequence(f);
  console.log(f);
  var m = function(x){return eval(f)};
  g = new Graphics1d(xmin, xmax, ymin, ymax, W, H, m);
  g.draw();
}
