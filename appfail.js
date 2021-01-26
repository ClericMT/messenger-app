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
    let h = {x: x,       y: y - hgt, z: z + dpth};
    objList.push({a,b,c,d,e,f,g,h});
    adjustments();
}

function adjustments(){
    for (const [p, k] in objList[0]){
        p.x += xAdj + 1000;
        p.x /= scale;
        p.y += yAdj;
        p.y /= scale;
        p.x *= (dp/p.z)
        p.y *= (dp/p.z) 

    }

}


console.log(objList[0])

box(200,200,200,600,500,500)

/*
let a = {x:-250, y:500, z: 25000}
let b = {x:250, y:500, z: 25000}
let c = {x:250, y:0, z: 25000}
let d = {x:-250, y:0, z: 25000}
let e = {x:-250, y:500, z: 50000}
let f = {x:250, y:500, z: 50000}
let g = {x:250, y:0, z: 50000}
let h = {x:-250, y:0, z: 50000}

p.push(a,b,c,d,e,f,g,h)
*/

for (let i = 0; i < p.length; i++){
    p[i].x += xAdj;
    p[i].x /= scale;
    p[i].y += yAdj;
    p[i].y /= scale;
    p[i].x *= (dp/p[i].z)
    p[i].y *= (dp/p[i].z) 
}

function drawFace(a,b,c,d){
    console.log(objList);
    console.log(objList[0].a.y)
    for (let i = 0; i < objList.length; i++){
        ctx.beginPath();
        ctx.moveTo(objList[i].a.x,objList[i].a.y);
        ctx.lineTo(objList[i].b.x,objList[i].b.y);
        ctx.lineTo(objList[i].c.x,objList[i].c.y);
        ctx.lineTo(objList[i].d.x,objList[i].d.y);
        ctx.lineTo(objList[i].a.x,objList[i].a.y);
        ctx.fillStyle = "grey";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
    
}

function draw(){
    
    //drawFace(4,5,6,7)
    //drawFace(1,2,6,5)
    //drawFace(3,2,6,7)
    //drawFace(0,4,7,3)
    //drawFace(0,1,5,4)
    drawFace()
}

draw();