let obj2DList = []

//Scaling
let xAdj = 3000;
let yAdj = 500;
const scale = 5

//Constants
let dp = 5000; //Distance between eye and picture plane
const x0 = 400; //Vanishing point
const y0 = 400;

let objList = []

//dimensions(width, height, depth, x, y, z)
const makeBox = (wdt, hgt, dpth, x, y, z, colour, objList) => {
    objList.push({wdt: wdt, hgt: hgt, dpth: dpth, x: x, y: y, z: z, colour: colour, id: objList.length, a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0});
    mapPoints(wdt, hgt, dpth, x, y, z, colour, objList.length - 1);
}

//Simulate 3d box
function mapPoints(wdt,hgt,dpth,x,y,z,colour,id){
    let a = {x: x,       y: y,       z: z};
    let b = {x: x + wdt, y: y,       z: z};
    let c = {x: x + wdt, y: y - hgt, z: z};
    let d = {x: x,       y: y - hgt, z: z};
    let e = {x: x,       y: y,       z: z + dpth};
    let f = {x: x + wdt, y: y,       z: z + dpth};
    let g = {x: x + wdt, y: y - hgt, z: z + dpth};
    let h = {x: x,       y: y - hgt, z: z + dpth};
    project2D(a,b,c,d,e,f,g,h,colour,id);
}

// Descriptive geometry inspired by 
// https://math.stackexchange.com/questions/2305792/3d-projection-on-a-2d-plane-weak-maths-ressources/2306853#2306853

function project2D(a,b,c,d,e,f,g,h,colour,id){
    const args = Array.from(arguments);
    args.forEach(el => {
        if (el === colour || el === id){
            el = el;
        } else {
            el.x += xAdj;
            el.x /= scale;
            el.y += yAdj;
            el.y /= scale;
            el.x = x0 + (el.x - x0) * (dp/(el.z+dp));
            el.y = y0 + (el.y - y0) * (dp/(el.z+dp));
        }
    })
    objList[id].a = a;
    objList[id].b = b;
    objList[id].c = c;
    objList[id].d = d;
    objList[id].e = e;
    objList[id].f = f;
    objList[id].g = g;
    objList[id].h = h;
}

export { makeBox, mapPoints, project2D, obj2DList, objList }
