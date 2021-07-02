var rocket;
var popul;
var total=100;
var lifespan=500;
var lifeP;
var gen;
var fi;
var count=0;
var target;
var rx=200;
var ry=300;
var rw=400;
var rh=10;
var rx1=100;
var ry1=100;
var rw1=200;
var rh1=10;
var rx2=500;
var ry2=100;
var rw2=200;
var rh2=10;
var maxforce=0.4;
var st="GENERATION: ";
var st1="FRAME: ";  
var st2="MAX FITNESS SO FAR: ";
var generation=1;
var maxx=0;
function setup() {
    createCanvas(800,600);
    rocket=new Rocket();
    popul=new Population();
    lifeP=createP();
    gen=createP();
    fi=createP();
    target=createVector(width/2,50);
}
function draw() {
    background(0);
    popul.run();
    lifeP.html(st1+" "+count);
    gen.html(st+" "+generation);
    fi.html(st2+" "+maxx);
    count++;
    if(count==lifespan){
        popul.evaluate();
        popul.selection();
        count=0;
        generation++;
    }
    rect(200,300,400,10);
    rect(100,100,200,10);
    rect(500,100,200,10);
    ellipse(target.x,target.y,16,16);
}
function Population(){
    this.rockets=[];
    this.popsize=total;
    this.matingpool=[];
    for(var i=0;i<this.popsize;i++){
        this.rockets[i]=new Rocket();
    }
    this.evaluate=function(){
        var maxfit=0;
        for(var i=0;i<this.popsize;i++){
            this.rockets[i].calcFitness();
            if(this.rockets[i].fitness>maxfit){
                maxfit=this.rockets[i].fitness;
                if(maxx<maxfit) maxx=maxfit;
            }
        }
        for(var i=0;i<this.popsize;i++){
            this.rockets[i].fitness/=maxfit;
        }
        this.matingpool=[];
        for(var i=0;i<this.popsize;i++){
            var n=this.rockets[i].fitness*100;
            for(var j=0;j<n;j++){
                this.matingpool.push(this.rockets[i]);
            }
        }
    }
    this.selection=function(){
        var newRockets=[];
        for(var i=0;i<this.rockets.length;i++){
            var parentA=random(this.matingpool).dna;
            var parentB=random(this.matingpool).dna;
            var child=parentA.crossover(parentB);
            child.mutation();
            newRockets[i]=new Rocket(child);
        }
        this.rockets=newRockets;
    }
    this.run=function(){
        for(var i=0;i<this.popsize;i++){
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }
}
function DNA(genes){
    if(genes){
        this.genes=genes;
    }
    else{
        this.genes=[];
        for(var i=0;i<lifespan;i++){
            this.genes[i]=p5.Vector.random2D();
            this.genes[i].setMag(maxforce);
        }
    }
    this.crossover=function(partner){
        var newgenes=[];
        for(var i=0;i<this.genes.length;i++){
            if(i%2){
                newgenes[i]=this.genes[i];
            }
            else{
                newgenes[i]=partner.genes[i];
            }
        }
        return new DNA(newgenes);
    }
    this.mutation=function(){
        for(var i=0;i<this.genes.length;i++){
            if(random(1)<0.01){
                this.genes[i]=p5.Vector.random2D();
                this.genes[i].setMag(maxforce);
            }
        }
    }
}
function Rocket(dna){
    this.pos=createVector(width/2,height);
    this.acc=createVector();
    this.vel=createVector();
    this.completed=false;
    this.crashed=false;
    if(dna) this.dna=dna;
    else this.dna=new DNA();
    this.fitness=0;
    this.applyForce=function(force){
        this.acc.add(force);
    }
    this.calcFitness=function(){
        var d=dist(this.pos.x,this.pos.y,target.x,target.y);
        this.fitness=map(d,0,width,width,0);
        if(this.completed){
            this.fitness*=10*(400/count);
        }
        if(this.crashed){
            this.fitness/=10;
            fill(255);
        }
    }
    this.update=function(){
        var d=dist(this.pos.x,this.pos.y,target.x,target.y);
        if(d<15){
            this.completed=true;
            this.pos=target.copy();
        }
        if(this.pos.x>rx&&this.pos.x<rx+rw&&this.pos.y>ry&&this.pos.y<ry+rh){
            this.crashed=true;
        } 
        if(this.pos.x>rx1&&this.pos.x<rx1+rw1&&this.pos.y>ry1&&this.pos.y<ry1+rh1){
            this.crashed=true;
        } 
        if(this.pos.x>rx2&&this.pos.x<rx2+rw2&&this.pos.y>ry2&&this.pos.y<ry2+rh2){
            this.crashed=true;
        } 
        else if(this.pos.x<0||this.pos.x>width){
            this.crashed=true;
        } 
        else if(this.pos.y<0||this.pos.y>height){
            this.crashed=true;
        }
        this.applyForce(this.dna.genes[count]);
        if(!this.completed&&!this.crashed){
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }
    this.show=function(){
        push();
        noStroke();
        fill(255,150);
        translate(this.pos.x,this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0,0,25,5);
        pop();
    }
}