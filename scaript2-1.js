var graph = document.getElementById("canvas");
var ctx = graph.getContext("2d");

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
    this.values = new Map();
    for (
      let a = this.xmin;
      a <= this.xmax;
      a += (-this.xmin + this.xmax) / this.W
    ) {
      this.values[a] = this.f(a);
    }
    this.ev = 1;
    return this.values;
  }
  draw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    var drawed = new Graphics1d();
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
    for (
      let a = this.xmin;
      a <= this.xmax;
      a += (-this.xmin + this.xmax) / this.W
    ) {
      if (this.values[a - (-this.xmin + this.xmax) * this.W] * this.values[a] < 0 ) {
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = zeros;
        ctx.arc(
          zerox + a * stepx,
          zeroy - stepy * this.values[a - 0.1],
          3, 0, 180
        );
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
      } else {
        ctx.lineTo(zerox + a * stepx, zeroy - this.values[a] * stepy);
      }
    }
    ctx.stroke();
    ctx.closePath();
    ctx.font = stepx + " serif";
    ctx.fillStyle = "black";
    let mx = "(" + this.xmax + ", " + this.ymax + ")";
    let mn = "(" + this.xmin + ", " + this.ymin + ")";
    ctx.fillText(
      mx,
      zerox + this.xmax * stepx - stepx * mx.length,
      zeroy + this.ymin * stepy + stepx
    );
    ctx.fillText(
      mn,
      zerox + this.xmin * stepx,
      zeroy + this.ymax * stepy - stepy
    );
  }

  autodraw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    this.ymin = this.f(this.xmin);
    this.ymax = this.f(this.xmax);

    this.draw(dots, axis, zeros, gaps, bg);
  }
}

var g = new Graphics1d();
g.draw();