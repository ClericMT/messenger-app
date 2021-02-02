import { makeBox, mapPoints, objList, envList, adjustCam, dp, project2D, movePlayer } from './modules/objects.js' 
import { colours } from './modules/colours.js'
import { renderObj, ctx } from './modules/canvas.js'

let socket = io();
    
let timer = 0; //Performance testing

//Constants
const groundLvl = 2500;
const p1VelX = 150;
const p1VelZ = 1000;

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
//const background = makeBox(200000, 200000, 1, -6000, 10000, 600, 'black', envList)
//const ground = makeBox(200000, 1, 200000, -40000, groundLvl, -10000, colours.ground, envList)

const generateRandomEnv = (numObjs) =>{
    for (let i = 0; i < numObjs; i++){
        makeBox(Math.random()*2000,Math.random()*2000,Math.random()*20000,Math.random()*10000,Math.random()* 10000, Math.random()*80000+120000, `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${Math.random()})`, objList)
    }
}

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
    let xTurn = (startPosX - x)*6;
    let yTurn = (startPosY - y)*6;
    adjustCam(xTurn, yTurn, 0)
}

let keyMap = {k8: false, k2: false, k4: false, k6: false, ka: false, kd: false, kw: false, ks: false}

window.onkeydown = function(e) {
    switch(e.key) {
        case '8':
            keyMap.k8 = true;
            break;
        case '2':
            keyMap.k2 = true;
            break;
        case '4':
            keyMap.k4 = true;
            break;
        case '6':
            keyMap.k6 = true;
            break;
        case 'a':
            keyMap.ka = true;
            break;
        case 'd':
            keyMap.kd = true;
            break;
        case 'w':
            keyMap.kw = true;
            break;
        case 's':
            keyMap.ks = true;
            break;
        default:
    }
}

window.onkeyup = function(e) {
    switch(e.key) {
        case '8':
            keyMap.k8 = false;
            break;
        case '2':
            keyMap.k2 = false;
            break;
        case '4':
            keyMap.k4 = false;
            break;
        case '6':
            keyMap.k6 = false;
            break;
        case 'a':
            keyMap.ka = false;
            break;
        case 'd':
            keyMap.kd = false;
            break;
        case 'w':
            keyMap.kw = false;
            break;
        case 's':
            keyMap.ks = false;
            break;
        default:
    }
}

const isKeyPressed = () => {
    const k = keyMap;
    if (k.ka && k.kw){
        movePlayer(p1VelX, -p1VelZ)
    }
    else if (k.kd && k.kw){
        movePlayer(-p1VelX, -p1VelZ)
    }
    else if (k.ka && k.ks){
        movePlayer(p1VelX, p1VelZ)
    }
    else if (k.kd && k.ks){
        movePlayer(-p1VelX, p1VelZ)
    }
    else if (k.ka){
        movePlayer(p1VelX, 0)
    }
    else if (k.kw){
        movePlayer(0, -p1VelZ)
    }
    else if (k.kd){
        movePlayer(-p1VelX, 0)
    }
    else if (k.ks){
        movePlayer(0, p1VelZ)
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

socket.on('accel', function(accel){
    console.log(accel[0])
    movePlayer(parseInt(accel[0]*-30), parseInt(accel[1]*-250))
})

function draw(){

    timer ++;
    isKeyPressed();
    ctx.clearRect(0, 0, 20000, 20000);
    objList.forEach(obj => {
        renderObj(obj.a, obj.b, obj.c, obj.d, obj.e, obj.f, obj.g, obj.h, obj.colour);
    })
    if (timer === 100){
        console.timeEnd("test1");
    }
    window.requestAnimationFrame(draw)
}

console.time("test1")
generateRandomEnv(40)
draw()









