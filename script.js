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
var xOffset = -8000;
var yOffset = 0;
var zoomn = 1.4;

var xx = 0;

//requestAnimationFrame(draw);
function draw()
{
    //zoom = zoomSlider.value;
    zoom = zoomn;
    zoom2 = zoom2Slider.value;
    zoom = zoom * zoom * zoom;
    zoom/=2;
    zoom+=zoom2/5000;
    //console.log(zoom)
    //xOffset = xOffsetSlider.value;
    //yOffset = yOffsetSlider.value;
    zoom *= canvas.width/4;
    /*let xxgoal = xx+10;
    for (xx = xx; xx < xxgoal; xx++) {
        fpsText.innerText=(xx/7680)*100;
        //console.log((x/3840)*100);
        for (let y = 0; y < canvas.height; y++) {
            let i = MandelbrotFunction(xx-canvas.width/2,y-canvas.height/2)*1;
            setPixel(xx,y, i,i,i);
        }
    }
    */
    for (let x = 0; x < canvas.width; x++) {
        //console.log((x/3840)*100);
        for (let y = 0; y < canvas.height; y++) {
            let i = MandelbrotFunction(x-canvas.width/2,y-canvas.height/2)*1;
            let color = HSVtoRGB(i/255,1,1)
            setPixel(x,y,color.r - i,color.g-i,color.b-i);
        }
    }
    setPixel(Math.round(canvas.height/2),Math.round(canvas.height/2), 255,0,0);
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(draw);
    //requestAnimFrame();
    /*
    if(xxgoal<7680)
    {
        requestAnimationFrame(draw);
    }
    */
}

document.onkeydown = function(e) { 
    switch (e.key) { 
        case "d": 
            xOffset-=-1/(zoom/10000);
            xOffsetSlider.value=xOffset;
            break; 
        case "a": 
            xOffset-=1/(zoom/10000);
            xOffsetSlider.value=xOffset; 
            break; 
        case "w": 
            yOffset-=-1/(zoom/10000);
            yOffsetSlider.value=yOffset; 
            break; 
        case "s": 
            yOffset-=1/(zoom/10000);
            yOffsetSlider.value=yOffset; 
            break; 
        case "e": 
            zoomn+=.5*(zoomn);
            zoomSlider.value=yOffset; 
            break; 
        case "q": 
            zoomn-=.25*(zoomn);
            zoomSlider.value=yOffset; 
            break; 
    } 
}; 
function MandelbrotFunction(xi, yi)
{
    let y = xi/zoom;
    let x = yi/zoom;

    x += xOffset/10000;
    y -= yOffset/10000;

    let iteration = 0;

    let z = math.complex(0, 0);

    for (i = 0; i != 255; i++)
    {
        z = math.add(math.multiply(z,z), math.complex(x, y)); //Mandelbrot, escape is 2
        //z = math.add(math.cos(z), math.complex(x, y)) // wacky that contains mandelbrot, escape is 10
        //z = math.add(math.multiply(z,math.cos(z)), math.complex(x,y)); //wacky of my own creation, escape is 25
        //z = math.add(math.multiply(math.divide(math.cos(z),math.multiply(x,y)),math.cos(math.multiply(z,z))) ,math.complex(x,y))
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
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}