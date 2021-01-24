//create canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');
fitToContainer(canvas);

function fitToContainer(canvas){
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

let origin = {x:0,y:0,z:0}
let dp = 2000;

let p = []
let xAdj = 5000;
let yAdj = 5000;
const scale = 0.8

let objList = []

function box(wdt,hgt,dpth,x,y,z){
    let a = {x: x,       y: y,       z: z};
    let b = {x: x + wdt, y: y,       z: z};
    let c = {x: x + wdt, y: y - hgt, z: z};
    let d = {x: x,       y: y - hgt, z: z};
    let e = {x: x,       y: y,       z: z + dpth};
    let f = {x: x + wdt, y: y,       z: z + dpth};
    let g = {x: x + wdt, y: y - hgt, z: z + dpth};
    let h = {x: x,       y: y - hgt, z: z + dpth}
    objList.push({a,b,c,d,e,f,g,h})
}


let a = {x:-250, y:500, z: 25000}
let b = {x:250, y:500, z: 25000}
let c = {x:250, y:0, z: 25000}
let d = {x:-250, y:0, z: 25000}
let e = {x:-250, y:500, z: 50000}
let f = {x:250, y:500, z: 50000}
let g = {x:250, y:0, z: 50000}
let h = {x:-250, y:0, z: 50000}

p.push(a,b,c,d,e,f,g,h)

for (let i = 0; i < p.length; i++){
    p[i].x += xAdj;
    p[i].x /= scale;
    p[i].y += yAdj;
    p[i].y /= scale;
    p[i].x *= (dp/p[i].z)
    p[i].y *= (dp/p[i].z) 
}

console.log(p)

function drawFace(a,b,c,d){
    ctx.beginPath();
    ctx.moveTo(p[a].x,p[a].y);
    ctx.lineTo(p[b].x,p[b].y);
    ctx.lineTo(p[c].x,p[c].y);
    ctx.lineTo(p[d].x,p[d].y);
    ctx.lineTo(p[a].x,p[a].y);
    ctx.fillStyle = "grey";
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}

function draw(){
    
    //drawFace(4,5,6,7)
    drawFace(1,2,6,5)
    drawFace(3,2,6,7)
    drawFace(0,4,7,3)
    //drawFace(0,1,5,4)
    drawFace(0,1,2,3)
}

draw();