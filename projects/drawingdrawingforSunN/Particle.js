
class Particle{
    constructor(x,y){
    this.x=x;
    this.y=y;
    this.yspeed=0;
    this.history=[];
    }

    update(){
        this.x+=random(-2,2);
        this.y+=random(-3,3);

        for(let i=0; i<this.history.length; i++){
            this.history[i].x+=random(-0.2,0.2);
            this.history[i].y+=random(-0.2,0.2);
        }
        let v=createVector(this.x,this.y);
        this.history.push(v);
        if(this.history.length>50){
            this.history.splice(0,1);
        }
    }

    show(){
      stroke(255);
      strokeWeight(20);
      noFill();
      // fill(255,50);
    //   ellipse(this.x,this.y,50,50);
    
      beginShape();
      for(let i=0; i<this.history.length; i++){
          let pos = this.history[i];
        //   fill(random(255));
        //   noStroke();
        //   ellipse(pos.x, pos.y, i, i);
        vertex(pos.x, pos.y);
      }
      endShape();
    }
}
