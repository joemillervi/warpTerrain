// Look for .hamburger
var $hamburger = document.querySelector(".hamburger");
var $menu = document.getElementById('menu');

$hamburger.addEventListener("click", () => {
  $hamburger.classList.toggle("is-active");
  $menu.classList.toggle('is-off-screen')
});

// resize menu
$menu.style.height = window.innerHeight - 30 + 'px';

// color inputs
function updateLeftColor(jscolor) {
  leftColor = '#' + jscolor;
  build()
}
function updateRightColor(jscolor) {
  rightColor = '#' + jscolor;
  build()
}
function updateLeftColorGlow(jscolor) {
  leftColorGlow = '#' + jscolor;
  build()
}
function updateRightColorGlow(jscolor) {
  rightColorGlow = '#' + jscolor;
  build()
}
function updateBackgroundColorGlow(jscolor) {
  document.getElementById("canvas").style.background = '#' + jscolor;
}

var leftColor = '#64C2B7';
var leftColorGlow = '#64C2B7'
var rightColor = '#C2646F';
var rightColorGlow = '#C2646F'

// Logic for warpTerrain
function build(isAlteringRandomness) {
  var canvas = document.getElementById('canvas');
  var pageWidth = canvas.width = window.innerWidth;
  var pageHeight = canvas.height = window.innerHeight - 13;
  console.log('width', window.innerWidth, pageWidth)
  console.log('height', window.innerHeight, pageHeight)
  // user input vars
  var variableThickness = Boolean(document.getElementById('variable-thickness').checked)
  var thickness = Number(document.getElementById('thickness').value)
  var widthCells = Number(document.getElementById('width-cells').value);
  var heightCells = Number(document.getElementById('height-cells').value);
  var rightGlowAmount = Number(document.getElementById('right-glow-amount').value);
  var leftGlowAmount = Number(document.getElementById('left-glow-amount').value);
  var rightDeletePercent = Number(document.getElementById('left-delete-percent').value);
  var leftDeletePercent = Number(document.getElementById('right-delete-percent').value);
  var cellWidth = pageWidth / widthCells;
  var cellHeight = pageHeight / heightCells;

  var warpNumber = Number(document.getElementById('warp-number').value) - 1; // indexed at 0
  var warpIteration = warpNumber;
  var verticalIteration = warpNumber;

  var ctx = canvas.getContext('2d');
  function drawV(warpIteration, x, y) { // warpIteration is indexed at 0
    warpOffset = (cellWidth / warpNumber) * warpIteration; // x offset
    if (isAlteringRandomness ? Math.random() * 100 > rightDeletePercent : true) {
      ctx.beginPath();
      ctx.strokeStyle = rightColor;
      ctx.shadowBlur = rightGlowAmount;
      ctx.shadowColor = rightColorGlow;
      ctx.moveTo(x, y);
      ctx.lineTo(x + warpOffset, y + cellHeight);
      ctx.lineWidth = variableThickness ? warpIteration: thickness;
      ctx.fill()
      ctx.stroke()
    }

    if (isAlteringRandomness ? Math.random() * 100 > leftDeletePercent : true) {
      ctx.beginPath()
      ctx.moveTo(x + warpOffset, y + cellHeight)
      ctx.strokeStyle = leftColor;
      ctx.shadowBlur = leftGlowAmount;
      ctx.shadowColor = leftColorGlow;
      ctx.lineTo(x + cellWidth, y);
      ctx.lineWidth = variableThickness ? warpIteration: thickness;
      ctx.stroke();
    }
  }

  // draw to page
  for (var i = 0; i < heightCells; i++) {
    warpIteration = verticalIteration;
    for (var j = 0; j < widthCells; j++) {
      var currentX = (pageWidth / widthCells) * j;
      var currentY = (pageHeight / heightCells) * i;
      drawV(warpIteration, currentX, currentY);
      // inc iterator
      if (warpIteration === 0) warpIteration = warpNumber;
      else warpIteration--;
    }
    if (verticalIteration === 0) verticalIteration = warpNumber;
    else verticalIteration--;
  }
}
build()
