export { makeBox, mapPoints, project2D, obj2DList }

let obj2DList = []

//Scaling
let xAdj = 3000;
let yAdj = 500;
const scale = 5

//Constants
let dp = 5000; //Distance between eye and picture plane
const x0 = 400; //Vanishing point
const y0 = 400;
const groundLvl = 2000;

//dimensions(width, height, depth, x, y, z)
const makeBox = (wdt, hgt, dpth, x, y, z, colour, objList) => {
    objList.push({wdt: wdt, hgt: hgt, dpth: dpth, x: x, y: y, z: z, colour: colour})
}

//Simulate 3d box
function mapPoints(wdt,hgt,dpth,x,y,z,colour){
    let a = {x: x,       y: y,       z: z};
    let b = {x: x + wdt, y: y,       z: z};
    let c = {x: x + wdt, y: y - hgt, z: z};
    let d = {x: x,       y: y - hgt, z: z};
    let e = {x: x,       y: y,       z: z + dpth};
    let f = {x: x + wdt, y: y,       z: z + dpth};
    let g = {x: x + wdt, y: y - hgt, z: z + dpth};
    let h = {x: x,       y: y - hgt, z: z + dpth};
    project2D(a,b,c,d,e,f,g,h,colour);
}

//Scale box
function project2D(a,b,c,d,e,f,g,h,colour){
    const args = Array.from(arguments);
    args.forEach(el => {
        if (el === colour){
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
    obj2DList.push({a,b,c,d,e,f,g,h,colour});
}

console.log(obj2DList)