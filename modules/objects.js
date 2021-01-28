//Constants
let dp = 11000; //Distance between eye and picture plane
let x0 = 300; //Vanishing point
let y0 = 200;
const x0init = 300;
const y0init = 200;

let objList = []
let envList = []

//Adjust head position and camera depth
const adjustCam = (x, y, dpNew) => {
    x0 = x0init + x;
    y0 = y0init + y;
    dp += dpNew;
    objList.forEach(o => {
        mapPoints(o.wdt,o.hgt,o.dpth,o.x,o.y,o.z,o.colour,o.id,o.list)
    })
    envList.forEach(o => {
        mapPoints(o.wdt,o.hgt,o.dpth,o.x,o.y,o.z,o.colour,o.id,o.list)
    })
}

const movePlayer = (x, z) => {
    objList.forEach(o => {
        o.x += x;
        o.z += z;
        mapPoints(o.wdt,o.hgt,o.dpth,o.x,o.y,o.z,o.colour,o.id,o.list)
    })
    envList.forEach(o => {
        o.x += x;
        o.z += z;
        mapPoints(o.wdt,o.hgt,o.dpth,o.x,o.y,o.z,o.colour,o.id,o.list)
    })
}

//dimensions(width, height, depth, x, y, z)
const makeBox = (wdt, hgt, dpth, x, y, z, colour, list) => {
    list.push({wdt: wdt, hgt: hgt, dpth: dpth, x: x, y: y, z: z, colour: colour, id: list.length, list: list, a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0});
    mapPoints(wdt, hgt, dpth, x, y, z, colour, list.length - 1, list);
}

//Simulate 3d box
function mapPoints(wdt,hgt,dpth,x,y,z,colour,id,list){
    let a = {x: x,       y: y,       z: z};
    let b = {x: x + wdt, y: y,       z: z};
    let c = {x: x + wdt, y: y - hgt, z: z};
    let d = {x: x,       y: y - hgt, z: z};
    let e = {x: x,       y: y,       z: z + dpth};
    let f = {x: x + wdt, y: y,       z: z + dpth};
    let g = {x: x + wdt, y: y - hgt, z: z + dpth};
    let h = {x: x,       y: y - hgt, z: z + dpth};
    project2D(a,b,c,d,e,f,g,h,colour,id,list);
}

// Descriptive geometry inspired by 
// https://math.stackexchange.com/questions/2305792/3d-projection-on-a-2d-plane-weak-maths-ressources/2306853#2306853

function project2D(a,b,c,d,e,f,g,h,colour,id,list){
    const args = Array.from(arguments);
    args.forEach(el => {
        if (el === colour || el === id || el === list){
            el = el;
        } else {
            el.x = x0 + (el.x - x0) * (dp/(el.z+dp));
            el.y = y0 + (el.y - y0) * (dp/(el.z+dp));
        }
    })
    list[id].a = a;
    list[id].b = b;
    list[id].c = c;
    list[id].d = d;
    list[id].e = e;
    list[id].f = f;
    list[id].g = g;
    list[id].h = h;
}


export { makeBox, mapPoints, project2D, objList, envList, adjustCam, dp, movePlayer }
