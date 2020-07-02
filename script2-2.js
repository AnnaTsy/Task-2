// x*x+(y-abs(x))*(y-pow(x*x, 1/3))=1000
var pict = document.getElementById("canvas");
var ctx = pict.getContext("2d");

class Graphics2d {
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 512,
    H = 512,
    f = function(x, y) {
      return x * x + y * y - 81;
    }
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
    this.fvalues = new Float64Array(this.H * this.W);
    this.dots = new Array (this.H * this.W);
    let count = 0;
    for (let a = this.xmin; a <= this.xmax; a += (-this.xmin + this.xmax) / this.W){
      for (let b = this.ymin; b <= this.ymax; b += (-this.ymin + this.ymax) / this.H) {
        this.dots[count] = [a, b];
        this.fvalues[count++] = this.f(a, b);
      }
    }
    this.ev = 1;
  }
  draw(
    dots = "#B22222", //red
    axis = "#9ACD32", //green
    zeros = "indigo",
    gaps = "magenta",
    bg = "#696969" //grey
  ) {
    pict.width = this.W;
    pict.height = this.H;
    var drawed = new Graphics2d();
    if (this.ev == 0) this.evaluate();
    let stepx = this.W / (-this.xmin + this.xmax);
    let stepy = this.H / (-this.ymin + this.ymax);
    let zerox = Math.abs(this.xmin) * stepx;
    let zeroy = Math.abs(this.ymin) * stepy;
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
    for (let a = 0; a <= g.W; a += stepx)
      for (let b = 0; b <= g.H; b += stepy) {
        ctx.beginPath();
        ctx.moveTo(a, b);
        ctx.lineTo(a + stepx, b);
        ctx.lineTo(a + stepx, b + stepy);
        ctx.lineTo(a, b + stepy);
        ctx.closePath();
        ctx.stroke();
      }
    ctx.lineWidth = 1;
    ctx.strokeStyle = dots;
    console.log(this.fvalues.length, this.dots.length);
    for (let a = 0; a < this.W * this.H; ++a) {
        ctx.beginPath();
        if(this.fvalues[a] < 0){
          ctx.fillStyle = "rgba(0, 128, 128, 0.25)"; //blue
        }
        else if(this.fvalues[a] > 0){
          ctx.fillStyle = "rgba(255, 69, 0, 0.25)"; //#B22222
        }
        else if(this.fvalues[a] == 0){
          ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        }
        ctx.arc(zerox + this.dots[a][0] * stepx, zeroy - this.dots[a][1] * stepy, 1, 0, 360);
        ctx.fill();
        ctx.closePath();
    }
  }

  autodraw(
    dots = "#B22222", //red
    axis = "#9ACD32", //green
    zeros = "indigo",
    gaps = "magenta",
    bg = "#696969" //grey
  ) {
    this.ymin = this.f(this.xmin);
    this.ymax = this.f(this.xmax);

    this.draw(dots, axis, zeros, gaps, bg);
  }
}
function replaceSequence(str) {
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
var g = new Graphics2d();
g.draw();
function count() {
  var xmin = parseFloat(document.getElementById("xmin").value);
  var xmax = parseFloat(document.getElementById("xmax").value);
  var ymin = parseFloat(document.getElementById("ymin").value);
  var ymax = parseFloat(document.getElementById("ymax").value);
  var W = parseFloat(document.getElementById("W").value);
  var H = parseFloat(document.getElementById("H").value);
  var f = document.getElementById("f").value;
  f = replaceSequence(f);
  console.log(f);
  var m = function(x, y) {
    return eval(f);
  };
  g = new Graphics2d(xmin, xmax, ymin, ymax, W, H, m);
  g.draw();
}
