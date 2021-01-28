import { makeBox, mapPoints, objList, envList, adjustCam, dp, project2D, movePlayer } from './modules/objects.js' 
import { colours } from './modules/colours.js'
import { renderObj, ctx } from './modules/canvas.js'

//Constants
const groundLvl = 2500;

//Mouse
let x;
let y;

//Lists
let selectedObj = ""

//Capture mouse position on start of drag (probably a better way to do this)
let capX;
let capZ;
let capObjX;
let capObjZ;
let startPosX;
let startPosY;
let initMouse = 0;

//Dimensions(width, height, depth, x, y, z)
const background = makeBox(20000, 20000, 1, -6000, 10000, 600, colours.background, envList)
const ground = makeBox(200000, 1, 200000, -40000, groundLvl, -10000, colours.ground, envList)
const skyscraper = makeBox(500, 20000, 10000, 5000, groundLvl, 100000, colours.box, objList)
const lilBox = makeBox(500, 500, 500, -200, groundLvl, 45000, colours.box, objList)
const cube = makeBox(500, 500, 500, 10000, groundLvl, 40000, colours.box, objList)

//Event Listeners
canvas.onmousedown = function(e) {
    let rect = canvas.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;
    isOverObject(x, y);
    capX = x;
    capZ = y;
    capObjX = selectedObj.x;
    capObjZ = selectedObj.z;
    canvas.addEventListener('mousemove', drag);
    canvas.onmouseup = function(e) {
        canvas.removeEventListener('mousemove', drag);
        selectedObj = ""
    }
}

canvas.onmousemove = function(e) {
    let rect = canvas.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;
    if (initMouse === 0){
        startPosX = x;
        startPosY = y;
    }
    initMouse = 1;
    let xTurn = (startPosX - x)*10;
    let yTurn = (startPosY - y)*10;
    adjustCam(xTurn, yTurn, 0)
}

window.onkeydown = function(e) {
    switch(e.key) {
        case '8':
            adjustCam(0, 0, 50);
            break;
        case '2':
            adjustCam(0, 0, -50);
            break;
        case '4':
            adjustCam(50, 0, 0);
            break;
        case '6':
            adjustCam(-50, 0, 0);
            break;
        case 'ArrowLeft':
            movePlayer(500, 0);
            break;
        case 'ArrowRight':
            movePlayer(-500, 0);
            break;
        case 'ArrowUp':
            movePlayer(0, -500);
            console.log(dp);
            console.log(objList[0].x)
            break;
        case 'ArrowDown':
            movePlayer(0, 500);
            break;
        default:
    }
}

const drag = (e) => {
    let rect = canvas.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.left;
    if (selectedObj){
        selectedObj.x = (capObjX - (capX - x)*8.5);
        selectedObj.z = (capObjZ + (capZ - y)*8.5);
        const o = objList[selectedObj.id];
        mapPoints(o.wdt, o.hgt, o.dpth, o.x, o.y, o.z, o.colour, o.id, o.list)
    }
}

const isOverObject = (x, y) => {
    
    objList.forEach((obj) => {
        if (x < obj.b.x && x > obj.a.x && y < obj.a.y && y > obj.d.y){
            findObject(obj.id)
        } else if (obj.id === objList.length){
            selectedObj = ""
        }
    })
}

const findObject = (id) => {
    objList.forEach((obj) => {
        if (obj.id === id){
            selectedObj = obj;
        }
    })
}

function draw(){
    ctx.clearRect(0, 0, 20000, 20000)
    envList.forEach(obj => {
        renderObj(obj.a, obj.b, obj.c, obj.d, obj.e, obj.f, obj.g, obj.h, obj.colour);
    })
    objList.forEach(obj => {
        renderObj(obj.a, obj.b, obj.c, obj.d, obj.e, obj.f, obj.g, obj.h, obj.colour);
    })
    window.requestAnimationFrame(draw)
}

draw()




