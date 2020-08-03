// Task 1
const canvas = document.getElementById("canV");
const ctx = canvas.getContext("2d");
const canvas_Width = 200;
const canvas_Height = 260;

function myFunction(){
  const res = document.getElementById("inputid");
  const [ first ] = res.value.split("");
  const result = +first;
  if(!isNaN(result)){
    ctx.clearRect(0, 0, canvas_Width, canvas_Height);
    start(result)
  }
}
function frame() {
  for(let i =0,j=0; j<200,i<200; j+=3,i+=10){
      ctx.strokeText("*",i,10);
      ctx.strokeText("*",190,10+i+j);
      ctx.strokeText("*",1,10+i+j);
      ctx.strokeText("*",i,257);
  }
}

function horizontal(value,positionX,positionY) {
  for (let i =0; i<120; i+=10) {
    ctx.strokeText(value,positionX+i,positionY-30);
  }
}
function vertical(value,positionX,positionY,count) {
  for (let i =0; i<count; i+=10) {
    ctx.strokeText(value,positionX-40,positionY+i);
  }
}
function diagonal(value,positionX,positionY,count) {
    for (let i = 0; i < count; i+=10) {
        ctx.strokeText(value,positionX-i,positionY+i);
    }
}

function staticline(value,change = 0) {
  horizontal(value,40,60);
  horizontal(value,40,canvas_Height/2+40);
  horizontal(value,40+change,canvas_Height+10);
}
function staticlineV(value) {
  vertical(value,canvas_Width,30,110);
  vertical(value,canvas_Width,140,110);
}
function start(value) {
    switch (value) {
      case 1:
        diagonal(value,110,30,80);
        vertical(value,canvas_Width-50,40,200);
        break;
      case 2:
      staticline(2,10);
      vertical(value,canvas_Width,30,115);
      vertical(value,canvas_Width-120,140,110);
        break;
      case 3:
      staticline(3);
      staticlineV(3);
        break;
      case 4:
      staticlineV(4)
      vertical(value,canvas_Width-120,30,110);
      horizontal(value,40,canvas_Height/2+40);
        break;
      case 5:
      staticline(5);
      vertical(value,canvas_Width-120,30,110);
      vertical(value,canvas_Width,140,110);
        break;
      case 6:
      staticline(6);
      vertical(value,canvas_Width-120,30,110);
      vertical(value,canvas_Width,140,110);
      vertical(value,canvas_Width-120,140,110);
        break;
      case 7:
      horizontal(value,40,60);
      diagonal(value,160,30,120)
        break;
      case 8:
      staticline(8);
      staticlineV(8);
      vertical(value,canvas_Width-120,30,110);
      vertical(value,canvas_Width-120,140,110);
        break;
      case 9:
      staticline(9);
      staticlineV(9);
      vertical(value,canvas_Width-120,30,110);
        break;
      case 0:
      staticlineV(0);
      horizontal(value,40,60);
      vertical(value,canvas_Width-120,30,110);
      vertical(value,canvas_Width-120,140,110);
      horizontal(value,40,canvas_Height+10)
        break;
    }
    frame();
}
// Task 2
const check = function(str) {
    const arr = str.split("");
    const onpenArr = ['(', '{', '['];
    const map = {'(' : ')', '{' : '}', '[' : ']'};
    const newarr = [];
    for (let i = 0; i < arr.length; i++){
        let simvol = arr[i];
        if (onpenArr.indexOf(simvol) > -1){
            newarr.push(simvol);
        }
        else{
            if (newarr.length == 0) return false;
            let pop = newarr.pop();
            if (map[pop] != simvol) return false;
        }
    }
    return newarr.length === 0;
};
console.log(check("()"))
console.log(check("()[]{}"))
console.log(check("(]"))
console.log(check("([)]"))
console.log(check("{[]}"))
