import { makeBox, mapPoints, obj2DList, objList } from './modules/objects.js' 
import { colours } from './modules/colours.js'
import { renderObj, ctx } from './modules/canvas.js'

//Constants
const groundLvl = 2000;

//Mouse
let x;
let y;

//Lists
let objTrue = false
let selectedObj = ""

//Dimensions(width, height, depth, x, y, z)
//const background = makeBox(20000, 20000, 1, -6000, 10000, 600, colours.background, objList)
const skyscraper = makeBox(500, 2000, 200, 500, groundLvl, 700, colours.box, objList)
const lilBox = makeBox(500, 500, 500, -200, groundLvl, 700, colours.box, objList)

//Event Listeners
canvas.onmousedown = function(e) {
    let rect = canvas.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;
    console.log(isOverObject(x, y));
    console.log(objTrue);
    console.log(selectedObj)
    canvas.addEventListener('mousemove', drag);
    canvas.onmouseup = function(e) {
        canvas.removeEventListener('mousemove', drag);
        objTrue = false;
        selectedObj = ""
    }
}

const drag = (e) => {
    let rect = canvas.getBoundingClientRect();
    x = e.pageX - rect.left
    if (selectedObj){
        console.log(x)
        selectedObj.x = x;
    }
}

const isOverObject = (x, y) => {
    obj2DList.forEach((obj) => {
        if (x < obj.b.x && x > obj.a.x && y < obj.a.y && y > obj.d.y){
            findObject(obj.id)
            objTrue = true;
        } else if (obj.id === obj2DList.length){
            objTrue = false; 
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
    obj2DList.forEach(obj => {
        renderObj(obj.a, obj.b, obj.c, obj.d, obj.e, obj.f, obj.g, obj.h, obj.colour);
    })
    window.requestAnimationFrame(draw)
}

const updateList = () => {
    makeBox(200,200,200,500,500,500,colours.box,objList)
    console.log(obj2DList)
}

draw()
updateList()



