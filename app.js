import { makeBox, mapPoints, obj2DList } from './modules/objects.js' 
import { colours } from './modules/colours.js'

//create canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Constants
const groundLvl = 2000;

//Lists
let objList = []

//Dimensions(width, height, depth, x, y, z)
//const background = makeBox(20000, 20000, 1, -6000, 10000, 600, colours.background, objList)
const skyscraper = makeBox(500, 2000, 200, 500, groundLvl, 700, colours.box, objList)

const init = () =>
    objList.forEach(obj => {
        mapPoints(obj.wdt, obj.hgt, obj.dpth, obj.x, obj.y, obj.z, obj.colour)
    })

//Could add to a different module?
function renderObj(a,b,c,d,e,f,g,h,colour){
    //Should add to obj.properties
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
    obj2DList.forEach(obj => {
        renderObj(obj.a, obj.b, obj.c, obj.d, obj.e, obj.f, obj.g, obj.h, obj.colour);
    })
    window.requestAnimationFrame(draw)
}


//Event Listeners
canvas.onmousemove = function(e) {
    let rect = canvas.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;
    isOverObject(x, y)
}

const isOverObject = (x, y) => {
    obj2DList.forEach((obj) => {
        if (x < obj.b.x && x > obj.a.x && y < obj.a.y && y > obj.d.y){
            obj.colour = 'red';
        }
    })
}

init()
draw()


