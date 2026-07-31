let drawing = [];
let currentPath = [];
let particles=[];
let speed = 0.1;
let osc, playing, freq, amp;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  frameRate(30);
  // noCursor();
  // canvas = createCanvas(400, 400);
  canvas.mousePressed(startPath);
  // canvas.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
  playing = true;
  // background(0);
  // slider = createSlider(1,20);
  // slider.position(10,10);
  // slider.style('width', '200px');
  // slider.size(30);
}

function startPath(){
  currentPath = [];
  drawing.push(currentPath);
}
// function endPath(){
//   drawing.push(currentPath);
// }

function draw() {
  background(200);

  // let SW = slider.value();
  for(let i=0; i<particles.length; i++){
    particles[i].update();
    particles[i].show();
  }
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 0.3);
  if(playing){
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.05);
    playOscillator();
  }

  if(mouseIsPressed && mouseX > 0 && mouseY > 0){
    playing =true;
    playOscillator();
    let point = {
      x: mouseX,
      y: mouseY
    }
    currentPath.push(point);
  }
  stroke(0);
  strokeWeight(1);
  noFill();
  for(let i = 0; i<drawing.length; i++){
    let path = drawing[i];
  beginShape();

  for(let j = 0; j<path.length; j++){
    vertex(path[j].x, path[j].y);
 
    if(path[j].x<width){
      path[j].x += speed;  
    }else if(path[j].x<0){
      path[j].x += 10;  
    }else{
      path[j].x -= random(40, 200);
  }
}
  endShape();
}
}
function playOscillator(){
  osc.start();
  playing  = true;
}

// function mouseReleased(){
//   osc.amp(0, 0.5);
//   playing = false;
// }

function keyPressed() {
  if (key === 'd') {
    removeFirstDrawing();
  } else if(key === 'n') {
    addParticle();
  } else if (key ==='k') {
    removeFirstParticle();
  } else if(key === 'q') {
    removeLastDrawing();
  } else if(key === 'g') {
    increaseSpeed();
  } else if(key === 'b') {
    decreaseSpeed();
  }
  // else if(key === 'p'){
  //   osc.amp(0, 0.5);
  //   playing = false;
  // }
}

// function mouseReleased() {
//   // ramp amplitude to 0 over 0.5 seconds
//   osc.amp(0, 0.5);
//   playing = false;
// }

function play(){
    osc.amp(0, 0.5);
    playing = false;

}

function removeFirstDrawing() {
  drawing.splice(0, 1);
}

function addParticle() {
  particles.push(new Particle(mouseX, mouseY));
}

function removeFirstParticle() {
  particles.splice(0, 1);
}

function removeLastDrawing() {
  drawing.splice(drawing.length - 1, 1);
}

function increaseSpeed() {
  speed += 0.1;
}

function decreaseSpeed() {
  speed -= 0.1;
}

function restartPaintingAnimal(event){
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  drawing = [];
  currentPath = [];
  particles = [];
  speed = 0.1;
  playing = true;
  if (osc) {
    osc.amp(0, 0.1);
  }
  clear();
  background(200);
}

window.addEventListener('DOMContentLoaded', () => {
  const restartButton = document.querySelector('[data-restart]');
  const actionButtons = document.querySelectorAll('[data-sketch-action]');

  if (restartButton) {
    restartButton.addEventListener('click', restartPaintingAnimal);
  }

  actionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const actions = {
        'remove-first-drawing': removeFirstDrawing,
        'add-particle': addParticle,
        'remove-first-particle': removeFirstParticle,
        'remove-last-drawing': removeLastDrawing,
        'increase-speed': increaseSpeed,
        'decrease-speed': decreaseSpeed
      };

      actions[button.dataset.sketchAction]();
    });
  });
});
