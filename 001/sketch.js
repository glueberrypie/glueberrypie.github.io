

var s1 = function(sketch) {

  let lines = [];
  let colors = ["#7209b7", "#3a0ca3", "#4361ee", "#4cc9f0", 
  "#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c", "#ffffff"];
  
    sketch.setup = function() {
      let canvas1 = sketch.createCanvas(800, 800);
      canvas1.position(0,0);
      // shuffle(colors, true);
      // canvas1.background(sketch.random(colors));
      // canvas1.stroke(255,230);

  // colorMode(OVERLAY);
  sketch.shuffle(colors, true);
  sketch.tiling();
  sketch.flowField();
  canvas1.background(sketch.random(colors));
  // background(random(colors));
  canvas1.stroke(255,230);
  for(let i=0; i<lines.length; i++){
    let x=lines[i][0];
    let y=lines[i][1];
    let len=lines[i][2];
    let ang=lines[i][3];
    let col=sketch.color(lines[i][4]);
    col.setAlpha(80);
    sketch.push();
    sketch.translate(x,y);
    sketch.rotate(ang);
    sketch.stroke(col);
    sketch.line(0,0,0,len);
    sketch.pop();
  }
    }
  
  
    sketch.flowField = function(){
      let num=400;
      let w=sketch.width/num;
      for(let i=0; i<=num; i++){
        for(let j=0; j<=num; j++){
          let x=i*w;
          let y=j*w;
          let nScl=0.0004;
          let nStr=sketch.noise(x*nScl, y*nScl) * 80;
          let ang=sketch.noise(x*nScl, y*nScl) * nStr;
          let col=sketch.get(x,y);
          let len=sketch.random(50);
          lines.push([x,y,len,ang,col]);
        }
      }
    }
   
    sketch.tiling = function(){
      sketch.beginShape();
      for(let a=0; a< sketch.TWO_PI; a+=0.01){
        let xoff=sketch.map(sketch.cos(a), -1, 1, 0, 2);
        let yoff=sketch.map(sketch.sin(a), -1, 1, 0, 2);
        let r=sketch.map(sketch.noise(xoff, yoff), 0, 1, 100, 200);
        let x=sketch.width/2+r * sketch.cos(a);
        let y=sketch.height/2+r * sketch.sin(a);
        let nn=(sketch.noise(xoff*0.003, yoff*0.003)*colors.length*2)-2;
        //     // console.log(nn);
            let index=sketch.int(sketch.constrain(nn, 0, colors.length-1));
            let col=colors[index];
            sketch.fill(col);
            sketch.vertex(x,y);
      }
      sketch.endShape(sketch.CLOSE);
  };
}
new p5(s1);
  // create a new instance of p5 and pass in the function for sketch 1

  
  
  // var s2 = function( sketch ) {
  //    sketch.setup = function() {
  //     let canvas2 = sketch.createCanvas(100, 100, sketch.WEBGL);
  //     canvas2.position(300,0);
  //   }
  //   sketch.draw = function() {
  //     //for canvas 2
  //     sketch.background(100);
  //     sketch.rotateX(sketch.frameCount * 0.01);
  //     sketch.rotateZ(sketch.frameCount * 0.02);
  //     sketch.cone(30, 50);
  //   }
  // };
  
  // // create the second instance of p5 and pass in the function for sketch 2
  // new p5(s2);