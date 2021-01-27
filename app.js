import { makeBox, mapPoints, obj2DList } from './modules/objects.js' 

//create canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Constants
const groundLvl = 2000;

//Lists
let objList = []

//Colours
const boxCol = 'rgba(255,255,0,1)'
const groundCol = 'rgba(255,0,0,1)'

//Dimensions(width, height, depth, x, y, z)
const background = makeBox(20000, 20000, 1, -6000, 10000, 600, 'blue', objList)
const skyscraper = makeBox(500, 2000, 200, 500, groundLvl, 700, 'red', objList)

function renderObj(a,b,c,d,e,f,g,h,colour){
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
    }

    drawFace(b,f,g,c,colour);
    drawFace(a,b,c,d,colour);
    drawFace(d,c,g,h,colour);
    drawFace(a,e,h,d,colour);
}

function draw(){
    objList.forEach(obj => {
        mapPoints(obj.wdt, obj.hgt, obj.dpth, obj.x, obj.y, obj.z, obj.colour)
    })
    obj2DList.forEach(obj => {
        renderObj(obj.a, obj.b, obj.c, obj.d, obj.e, obj.f, obj.g, obj.h, obj.colour);
    })
}

draw()


