function build() {
  var canvas = document.getElementById('canvas');
  var pageWidth = canvas.width = window.innerWidth;
  var pageHeight = canvas.height = window.innerHeight - 30;
  console.log('width', window.innerWidth, pageWidth)
  console.log('height', window.innerHeight, pageHeight)
  // user input vars
  var variableThickness = Boolean(document.getElementById('variable-thickness').checked)
  var thickness = Number(document.getElementById('thickness').value)
  var widthCells = Number(document.getElementById('width-cells').value);
  var heightCells = Number(document.getElementById('height-cells').value);
  var cellWidth = pageWidth / widthCells;
  var cellHeight = pageHeight / heightCells;

  var warpNumber = Number(document.getElementById('warp-number').value) - 1; // indexed at 0
  var warpIteration = warpNumber;
  var verticalIteration = warpNumber;

  var ctx = canvas.getContext('2d');
  function drawV(warpIteration, x, y) { // warpIteration is indexed at 0
    warpOffset = (cellWidth / warpNumber) * warpIteration; // x offset
    ctx.beginPath();
    ctx.strokeStyle = 'orange';
    ctx.shadowBlur = 10;
    ctx.shadowColor = "orange";
    ctx.moveTo(x, y);
    ctx.lineTo(x + warpOffset, y + cellHeight);
    ctx.lineWidth = variableThickness ? warpIteration: thickness;
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x + warpOffset, y + cellHeight)
    ctx.strokeStyle = 'blue';
    ctx.lineTo(x + cellWidth, y);
    ctx.lineWidth = variableThickness ? warpIteration: thickness;
    ctx.stroke();
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
