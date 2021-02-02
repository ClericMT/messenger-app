//variables
let shadowBlur = 15;
let shadowOffsetX = 5;
let shadowOffsetY = 5;
let up = true;

//create canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

let scaleX = window.innerWidth / canvas.width;
let scaleY = window.innerHeight / canvas.height;

let scaleToFit = Math.min(scaleX, scaleY);
let scaleToCover = Math.max(scaleX, scaleY);

stage.style.transformOrigin = '0 0'; //scale from top left
stage.style.transform = 'scale(' + scaleToCover + ')';

function renderObj(a,b,c,d,e,f,g,h,colour){
    const f1 = [e,f,g,h]
        , f2 = [b,f,g,c]
        , f3 = [d,c,g,h]
        , f4 = [a,b,c,d]
        , f5 = [a,e,h,d]
        , f6 = [a,b,f,e]
    const faceArr = [f1, f2, f3, f4, f5, f6]
 
    for (let i = 0; i < faceArr.length; i++){
        drawFace(faceArr[i])
    }

    function drawFace(f){
        ctx.beginPath();
        ctx.moveTo(f[0].x,f[0].y);
        ctx.lineTo(f[1].x,f[1].y);
        ctx.lineTo(f[2].x,f[2].y);
        ctx.lineTo(f[3].x,f[3].y);
        ctx.lineTo(f[0].x,f[0].y);
        ctx.fillStyle = colour;
        ctx.strokeStyle = "white";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}

const objAnimateGlow = () =>{
    switch(shadowBlur){
        case 25:
            up = false;
            break;
        case 0:
            up = true;
            break;
    }
    up ? animateGlow(1) : animateGlow(-1);
    function animateGlow(dir){
        shadowBlur += dir;
        shadowOffsetX += dir;
        shadowOffsetY += dir;
    }
}

export { renderObj, ctx }
