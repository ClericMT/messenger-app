//create canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    drawFace(d,c,g,h,colour);
    drawFace(a,b,c,d,colour);
    drawFace(a,e,h,d,colour);
}

export { renderObj, ctx }
