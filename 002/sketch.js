let cols, rows;
let scl=8;
let inc=0.1;
let v;
let zoff=0;
let particles=[];
let alp=90;
let flowfield;


function setup() {
  createCanvas(600, 600);
  cols=floor(width/scl);
  rows=floor(height/scl);

  flowfield= new Array(cols*rows);

  for(let i=0; i<1000; i++){
    particles[i]=new Particle(alp);
  }
  background(0);
}

function draw() {
  randomSeed(3);
  let yoff=0;
  for(let y=0; y<rows; y++){
    let xoff=0;
    for(let x=0; x<cols; x++){
      xoff+=inc;
      let index= int(x+y*cols);
      let angle=noise(xoff, yoff, zoff)*TWO_PI*6;
      let v=p5.Vector.fromAngle(angle);
      v.setMag(0.5);
      flowfield[index]= v;
    }
    yoff+=0.1;
    zoff+=0.0003;
  }

  for(let i=0; i<particles.length; i++){
    if(particles[i].isDead()){
      particles.splice(i,1);
      particles.push(new Particle(random(5,30)));
    }
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].checkEdges();
    particles[i].show();
  }
  
}

