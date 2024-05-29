// OLD AND BAD DO NOT USE







//Unoptimized, 50 precision, 50x50, 255 iterations - 0.985
//Grid Checks, 50 precision, 50x50, 255 iterations - 1.221
//Grid Checks + Skip Checks, 50 precision, 50x50, 255 iterations - 1.426
//Grid Checks + Skip Checksx2, 50 precision, 50x50, 255 iterations - 1.495
//Grid Checks + Skip Checksx3, 50 precision, 50x50, 255 iterations - 1.505
//Grid Checks + Skip Checksx5, 50 precision, 50x50, 255 iterations - 1.522
Decimal.set({ precision: 50 })
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//var zoomSlider = document.getElementById("zoom");
//var zoom2Slider = document.getElementById("zoom2");
//var xOffsetSlider = document.getElementById("xOffset");
//var yOffsetSlider = document.getElementById("yOffset");
var fpsText = document.getElementById("fps");
var zoom = new Decimal(1);
var xOffset = new Decimal(-8000);
var yOffset = new Decimal(0);
var zoomn = new Decimal(1.4);
var iterations = 255;
var res = 50;


//requestAnimationFrame(draw);
function draw()
{
    zoom = Decimal.pow(zoomn, 3).div(2).mul(res / 4);

    var ScreenArray = [];

    // Grid Checks
    for (let x = 0; x < res; x++) {
        ScreenArray[x] = [];
        for (let y = 0; y < res; y++) {
            if(x % 8 == 0 || y % 8 == 0 || x < 8 || y < 8 || x > res-10 || y > res-10)
            {
                ScreenArray[x][y] = MandelbrotFunction(x-res/2,y-res/2);
            }
            else
            {
                ScreenArray[x][y] = -1;
            }
        }
    }
    for (let x = 0; x < res; x++) {
        for (let y = 0; y < res; y++) {
            if((x % 8 == 0 || y % 8 == 0) && x >= 8 && y >= 8 && x <= res-10 && y <= res-10)
            {
                if
                    (
                        ScreenArray[x][y] == ScreenArray[x+1][y] && ScreenArray[x+2][y] == ScreenArray[x+3][y] && ScreenArray[x+4][y] == ScreenArray[x+5][y] && ScreenArray[x+6][y] == ScreenArray[x+7][y] && ScreenArray[x+8][y] == ScreenArray[x][y] &&
                        ScreenArray[x][y+8] == ScreenArray[x+1][y+8] && ScreenArray[x+2][y+8] == ScreenArray[x+3][y+8] && ScreenArray[x+4][y+8] == ScreenArray[x+5][y+8] && ScreenArray[x+6][y+8] == ScreenArray[x+7][y+8] && ScreenArray[x+8][y+8] == ScreenArray[x][y+8] &&
                        ScreenArray[x][y] == ScreenArray[x][y+1] && ScreenArray[x][y+2] == ScreenArray[x][y+3] && ScreenArray[x][y+4] == ScreenArray[x][y+5] && ScreenArray[x][y+6] == ScreenArray[x][y+7] && ScreenArray[x][y+8] == ScreenArray[x][y] &&
                        ScreenArray[x+8][y] == ScreenArray[x+8][y+1] && ScreenArray[x+8][y+2] == ScreenArray[x+8][y+3] && ScreenArray[x+8][y+4] == ScreenArray[x+8][y+5] && ScreenArray[x+8][y+6] == ScreenArray[x+8][y+7] && ScreenArray[x+8][y+8] == ScreenArray[x+8][y]
                    )
                {
                    for (let i = 0; i < 8; i++) {
                        for (let j = 0; j < 8; j++) {
                            ScreenArray[x+i][y+j] = ScreenArray[x][y];
                        }
                    }
                }
                else
                {
                    for (let i = 0; i < 8; i++) {
                        for (let j = 0; j < 8; j++) {
                            if((x+i)%4 == 0 || (y+j)%4 == 0)
                            {
                                if(ScreenArray[x+i][y+j] == -1)
                                {
                                    ScreenArray[x+i][y+j] = MandelbrotFunction(x+i-res/2,y+j-res/2);
                                }
                            }
                        }
                    }
                }
            }
            
        }
    }
    for (let x = 0; x < res; x++) {
        for (let y = 0; y < res; y++) {
            if((x % 4 == 0 || y % 4 == 0) && x >= 8 && y >= 8 && x <= res-10 && y <= res-10)
            {
                if
                    (
                        ScreenArray[x][y] == ScreenArray[x+1][y] && ScreenArray[x+2][y] == ScreenArray[x+3][y] && ScreenArray[x+4][y] == ScreenArray[x][y] &&
                        ScreenArray[x][y+4] == ScreenArray[x+1][y+4] && ScreenArray[x+2][y+4] == ScreenArray[x+3][y+4] && ScreenArray[x+4][y+4] == ScreenArray[x][y+4] &&
                        ScreenArray[x][y] == ScreenArray[x][y+1] && ScreenArray[x][y+2] == ScreenArray[x][y+3] && ScreenArray[x][y+4] == ScreenArray[x][y] &&
                        ScreenArray[x+4][y] == ScreenArray[x+4][y+1] && ScreenArray[x+4][y+2] == ScreenArray[x+4][y+3] && ScreenArray[x+4][y+4] == ScreenArray[x+4][y]
                    )
                {
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            ScreenArray[x+i][y+j] = ScreenArray[x][y];
                        }
                    }
                }
                else
                {
                    for (let i = 0; i < 8; i++) {
                        for (let j = 0; j < 8; j++) {
                            if((x+i)%2 == 0 || (y+j)%2 == 0 )
                            {
                                if(ScreenArray[x+i][y+j] == -1)
                                {
                                    ScreenArray[x+i][y+j] = MandelbrotFunction(x+i-res/2,y+j-res/2);
                                }
                            }
                        }
                    }
                }
            }
            
        }
    }
    for (let x = 0; x < res; x++) {
        for (let y = 0; y < res; y++) {
            if(ScreenArray[x][y] == -1)
            {
                if
                    (
                        ScreenArray[x][y] == ScreenArray[x-1][y-1] && ScreenArray[x-1][y-1] == ScreenArray[x][y-1] && ScreenArray[x][y-1] == ScreenArray[x+1][y-1] &&
                        ScreenArray[x][y] == ScreenArray[x-1][y+1] && ScreenArray[x-1][y+1] == ScreenArray[x][y+1] && ScreenArray[x][y+1] == ScreenArray[x+1][y+1] &&
                        ScreenArray[x][y] == ScreenArray[x-1][y] && ScreenArray[x][y] == ScreenArray[x+1][y] 
                    )
                {

                    ScreenArray[x][y] = ScreenArray[x-1][y];

                }
                else
                {
                    ScreenArray[x][y] = MandelbrotFunction(x-res/2,y-res/2);
                }
            }
            
        }
    }


    for (let x = 0; x < res; x++) {
        for (let y = 0; y < res; y++) {
            let i = ScreenArray[x][y];
            let color = HSVtoRGB((i%255)/50,1,1-i/iterations);
            setPixel(x,y,color.r,color.g,color.b);
        }
    }
    //setPixel(Math.round(res/2),Math.round(res/2), 255,0,0);
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(draw);
    requestAnimFrame();
}

document.onkeydown = function(e) { 
    switch (e.key) { 
        case "d": 
            xOffset = Decimal.add(xOffset, Decimal.div(1,Decimal.div(zoom,10000)));
            break; 
        case "a": 
            xOffset = Decimal.sub(xOffset, Decimal.div(1,Decimal.div(zoom,10000)));
            break; 
        case "w": 
            yOffset = Decimal.add(yOffset, Decimal.div(1,Decimal.div(zoom,10000)));
            break; 
        case "s": 
            yOffset = Decimal.sub(yOffset, Decimal.div(1,Decimal.div(zoom,10000)));

            break; 
        case "e": 
            zoomn = Decimal.add(zoomn, Decimal.div(zoomn,2));
            break; 
        case "q": 
            zoomn = Decimal.sub(zoomn, Decimal.div(zoomn,4));
            break; 
        case "1": 
            res = 50;
            canvas.width = res;
            canvas.height = res;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            break; 
        case "2": 
            res = 100;
            canvas.width = res;
            canvas.height = res;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            break; 
        case "3": 
            res = 200;
            canvas.width = res;
            canvas.height = res;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            break; 
        case "4": 
            res = 400;
            canvas.width = res;
            canvas.height = res;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            break; 
        case "5": 
            res = 700;
            canvas.width = res;
            canvas.height = res;
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            break; 
    } 
}; 
function MandelbrotFunction(xi, yi)
{
    let y = Decimal.div(xi,zoom);
    let x = Decimal.div(yi,zoom);

    x = Decimal.add(x, Decimal.div(xOffset,10000));
    y = Decimal.sub(y, Decimal.div(yOffset,10000));

    var zx = new Decimal(0);
    var zy = new Decimal(0);
    var cx= new Decimal(x);
    var cy= new Decimal(y);

    for (let i = 0; i < iterations; i++)
    {
        i++;
        xt = Decimal.mul(zx,zy);
        zx = Decimal.add(Decimal.sub(Decimal.mul(zx,zx), Decimal.mul(zy,zy)), cx);
        zy = Decimal.add(Decimal.mul(2,xt), cy);
        let oldoldoldoldzx = new Decimal(zx);
        let oldoldoldoldzy = new Decimal(zy);
        i++;
        xt = Decimal.mul(zx,zy);
        zx = Decimal.add(Decimal.sub(Decimal.mul(zx,zx), Decimal.mul(zy,zy)), cx);
        zy = Decimal.add(Decimal.mul(2,xt), cy);
        let oldoldoldzx = new Decimal(zx);
        let oldoldoldzy = new Decimal(zy);
        i++;
        xt = Decimal.mul(zx,zy);
        zx = Decimal.add(Decimal.sub(Decimal.mul(zx,zx), Decimal.mul(zy,zy)), cx);
        zy = Decimal.add(Decimal.mul(2,xt), cy);
        let oldoldzx = new Decimal(zx);
        let oldoldzy = new Decimal(zy);
        i++;
        xt = Decimal.mul(zx,zy);
        zx = Decimal.add(Decimal.sub(Decimal.mul(zx,zx), Decimal.mul(zy,zy)), cx);
        zy = Decimal.add(Decimal.mul(2,xt), cy);
        let oldzx = new Decimal(zx);
        let oldzy = new Decimal(zy);

        xt = Decimal.mul(zx,zy);
        zx = Decimal.add(Decimal.sub(Decimal.mul(zx,zx), Decimal.mul(zy,zy)), cx);
        zy = Decimal.add(Decimal.mul(2,xt), cy);
        
        if (Decimal.add(Decimal.mul(zx,zx),Decimal.mul(zy,zy)).greaterThan(4))
        {
            if (Decimal.add(Decimal.mul(oldzx,oldzx),Decimal.mul(oldzy,oldzy)).greaterThan(4))
            {
                if (Decimal.add(Decimal.mul(oldoldzx,oldoldzx),Decimal.mul(oldoldzy,oldoldzy)).greaterThan(4))
                {
                    if (Decimal.add(Decimal.mul(oldoldoldzx,oldoldoldzx),Decimal.mul(oldoldoldzy,oldoldoldzy)).greaterThan(4))
                    {
                        if (Decimal.add(Decimal.mul(oldoldoldoldzx,oldoldoldoldzx),Decimal.mul(oldoldoldoldzy,oldoldoldoldzy)).greaterThan(4))
                        {
                            return i-4;
                        }
                        return i-3;
                    }
                    return i-2;
                }
                return i-1;
            }
            return i;
        }
    }
    return iterations;
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
  fpsText.innerText = Math.round(fps*1000)/1000;
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