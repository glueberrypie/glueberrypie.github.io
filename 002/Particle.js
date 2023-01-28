
class Particle{
    constructor(alpha){
    this.pos=createVector(random(width),random(height));
    this.vel=createVector(0,0);
    this.acc=createVector(0,0);
    this.prevPos=this.pos.copy();
    this.alpha=alpha;
    this.maxspeed=2;
    this.force;
    }

    update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(this.maxspeed);
    this.acc.mult(0);
    this.alpha--;
    }

    follow(flowfield){
        let x= floor(this.pos.x/scl);
        let y=floor(this.pos.y/scl);
        let index=constrain(x+y*cols, 0, (width/scl)*(height*scl)-1);
        this.force=flowfield[index];
        this.applyForce(this.force);
    }

    applyForce(force){
        this.acc.add(force);       
    }

    show(){
        stroke(255,243,0,this.alpha);
        strokeWeight(0.5);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }

    updatePrev(){
        this.prevPos.x=this.pos.x;
        this.prevPos.y=this.pos.y;
    }

    checkEdges(){
        if(this.pos.x<0){
            this.pos.x=width;
            this.updatePrev();
        }
        if(this.pos.x>width){
            this.pos.x=0;
            this.updatePrev();
        }
        if(this.pos.y<0){
            this.pos.y=height;
            this.updatePrev();
        }
        if(this.pos.y>height){
            this.pos.y=0;
            this.updatePrev();
        }
    }

    isDead(){
        if(this.alpha<-30){
            return true;
        }else{
            return false;
        }
    }

}