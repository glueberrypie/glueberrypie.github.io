var s1 = function( sketch ) {
  let a=0;
  
    sketch.setup = function() {
      let canvas1 = sketch.createCanvas(200, 200);
      canvas1.position(100,100);
      // shuffle(colors, true);
      canvas1.strokeWeight(1);
      sketch.colorMode(sketch.HSB);
      sketch.background(0);
  // noLoop();
  let l=30;
  for(let j=0; j<4; j++){
    let r=sketch.random(360);
    sketch.stroke(r,170,180,0.3); 
    for(let x=0; x<600; x+=40){
      for(let y=0; y<600; y+=40){
        for(let i=0; i<10; i++){
          let xx=sketch.random(x-10, x+10);
          let yy=sketch.random(y-10, y+10);
          sketch.noiseLine(xx,yy);
        }
      }
    }
  }   
} 
    sketch.noiseLine= function(x,y){
      let c = 8;

      sketch.beginShape();
      for(let i = 0; i < c; i++){
        let ns = 0.009;
        let n = 10;
        let angle = sketch.noise(x *ns, y * ns, i * 0.1) *c;
        // ellipse(x, y,2,2);
        // px = x;
        // py = y;
        x += sketch.cos(angle) * n;
        y += sketch.sin(angle) * n;
        sketch.vertex(x,y);
      }
      sketch.endShape();
    }
   }
  // create a new instance of p5 and pass in the function for sketch 1
  new p5(s1);
  
  
  var s2 = function( sketch ) {
    let a=0;
    
      sketch.setup = function() {
        let canvas1 = sketch.createCanvas(3000, 400);
        canvas1.position(300,300);
        // shuffle(colors, true);
        canvas1.strokeWeight(1);
        sketch.colorMode(sketch.HSB);
    // noLoop();
    let l=30;
    for(let j=0; j<4; j++){
      let r=sketch.random(360);
      sketch.stroke(r,200,190,0.5); 
      for(let x=0; x<3000; x+=40){
        for(let y=0; y<300; y+=40){
          for(let i=0; i<10; i++){
            let xx=sketch.random(x-10, x+10);
            let yy=sketch.random(y-10, y+10);
            sketch.noiseLine(xx,yy);
          }
        }
      }
    }
      
  } 
      sketch.noiseLine= function(x,y){
        let c = 10;
  
        sketch.beginShape();
        for(let i = 0; i < c; i++){
          let ns = 0.009;
          let n = 10;
          let angle = sketch.noise(x *ns, y * ns, i * 0.1) *c;
          // ellipse(x, y,2,2);
          // px = x;
          // py = y;
          x += sketch.cos(angle) * n;
          y += sketch.sin(angle) * n;
          sketch.vertex(x,y);
        }
        sketch.endShape();
      }
     }
    // create a new instance of p5 and pass in the function for sketch 1
    new p5(s2);