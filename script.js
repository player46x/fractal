var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var zoomSlider = document.getElementById("zoom");
var zoom2Slider = document.getElementById("zoom2");
var xOffsetSlider = document.getElementById("xOffset");
var yOffsetSlider = document.getElementById("yOffset");
var fpsText = document.getElementById("fps");
var zoom = 1;
var zoom2 = 0;
var xOffset = 10;
var yOffset = 0;
requestAnimationFrame(draw);
function draw()
{
    zoom = zoomSlider.value;
    zoom2 = zoom2Slider.value;
    zoom *= zoom;
    zoom/=2;
    zoom+=zoom2/5000;
    //console.log(zoom)
    xOffset = xOffsetSlider.value;
    yOffset = yOffsetSlider.value;
    zoom *= canvas.width/4;
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            let i = MandelbrotFunction(x-canvas.width/2,y-canvas.height/2)*4;
            //console.log(i);
            setPixel(x,y, i,i,i);
        }
    }
    setPixel(canvas.width/2,canvas.height/2, 255,0,0);
    ctx.putImageData(imageData, 0, 0);
    requestAnimFrame();
    requestAnimationFrame(draw);
}
function MandelbrotFunction(xi, yi)
{
    let y = xi/zoom;
    let x = yi/zoom;

    x += xOffset/10000;
    y -= yOffset/10000;

    let iteration = 0;

    let z = math.complex(0, 0);

    for (i = 0; i != 25; i++)
    {
        z = math.add(math.multiply(z,z), math.complex(x, y));
        if (math.abs(z) > 2)
        {
            return i;
        }
        else
        {
            iteration++;
        }
    }
    return iteration;
}
function setPixel(y,x, r,g,b)
{   
    let pixelX = x*4;
    let pixelY = y*4;
    imageData.data[pixelX + pixelY * canvas.width] = r;
    imageData.data[(pixelX + pixelY * canvas.width)+1] = g;
    imageData.data[(pixelX + pixelY * canvas.width)+2] = b;
    imageData.data[(pixelX + pixelY * canvas.width)+3] = 255;
}

var lastCalledTime;
var fps;

function requestAnimFrame() 
{
  if(!lastCalledTime) {
     lastCalledTime = performance.now();
     fps = 0;
     return;
  }
  delta = (performance.now() - lastCalledTime)/1000;
  lastCalledTime = performance.now();
  fps = 1/delta;
  fpsText.innerText = math.round(fps);
} 