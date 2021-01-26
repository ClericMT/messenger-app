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

//Constants

let dp = 2000; //Distance between eye and picture plane
const groundLvl = 800;

//Scaling
let p = []
let xAdj = 50;
let yAdj = 50;
const scale = 5

//Lists
let objList = []

//Colours
const boxCol = 'rgba(255,255,0,1)'
const groundCol = 'rgba(255,0,0,1)'

//Simulate 3d box
function makeBox(wdt,hgt,dpth,x,y,z,colour){
    let a = {x: x,       y: y,       z: z};
    let b = {x: x + wdt, y: y,       z: z};
    let c = {x: x + wdt, y: y - hgt, z: z};
    let d = {x: x,       y: y - hgt, z: z};
    let e = {x: x,       y: y,       z: z + dpth};
    let f = {x: x + wdt, y: y,       z: z + dpth};
    let g = {x: x + wdt, y: y - hgt, z: z + dpth};
    let h = {x: x,       y: y - hgt, z: z + dpth};
    objList.push({a,b,c,d,e,f,g,h});
    scaleObj(a,b,c,d,e,f,g,h)
    renderObj(a,b,c,d,e,f,g,h,colour);
}

//Scale box
function scaleObj(a,b,c,d,e,f,g,h){
    const args = Array.from(arguments);
    args.forEach(el => {
        el.x += xAdj;
        el.x /= scale;
        el.y += yAdj;
        el.y /= scale;
        el.x *= (dp/el.z)
        el.y *= (dp/el.z) 
    })
}

function renderObj(a,b,c,d,e,f,g,h,colour){
    drawFace(b,f,g,c,colour);
    drawFace(a,b,c,d,colour);
    drawFace(d,c,g,h,colour);
    drawFace(a,e,h,d,colour);
}

function drawFace(p1,p2,p3,p4,colour){
    ctx.beginPath();
    ctx.moveTo(p1.x,p1.y);
    ctx.lineTo(p2.x,p2.y);
    ctx.lineTo(p3.x,p3.y);
    ctx.lineTo(p4.x,p4.y);
    ctx.lineTo(p1.x,p1.y);
    ctx.fillStyle = colour;
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    console.log(p1)
}

const background = makeBox(2000,2000,1,0,2000,600,'rgb(153, 204, 255)')
const bawxxyz = makeBox(2000,1,2000,300,groundLvl,600,groundCol)
const bawx = makeBox(500,200,200,500,groundLvl,700,boxCol)
const ground = makeBox(200,100,600,600,groundLvl,700,boxCol)

