const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var barOptions, ballOptions, constraintOptions;

var bar, ball;
var ballRadius;

var rope;

var mouseControl;

function setup() {
  createCanvas(400,400);
  engine = Engine.create();
  world = engine.world;
  barOptions = {
    isStatic : true
  }
  ballOptions = {
    isStatic : false
  }
  ballRadius = 40;
  bar = Bodies.rectangle(200,100,250,10,barOptions);
  ball = Bodies.circle(300,200,ballRadius,ballOptions);
  constraintOptions = {
    bodyA : bar,
    bodyB : ball,
    stiffness : 0.02,
    length : 120
  }
  rope = Constraint.create(constraintOptions);
  World.add(world, bar);
  World.add(world,ball);
  World.add(world,rope);
  mouseControl = 0;
}

function draw() {
  background("black");
  Engine.update(engine);
  rectMode(CENTER);
  rect(bar.position.x,bar.position.y,bar.bounds.max.x-bar.bounds.min.x,bar.bounds.max.y-bar.bounds.min.y);
  circle(ball.position.x,ball.position.y,ballRadius);
  strokeWeight(7);
  stroke("white");
  line(bar.position.x,bar.position.y,ball.position.x,ball.position.y);
  text("Press space to take control, enter to release control",50,50);
  if(keyDown("space")) {
    mouseControl = 1;
  }
  if(keyDown("enter")) {
    mouseControl = 0;
  }
  if(mouseControl) {
    ball.position.x = mouseX;
    ball.position.y = mouseY;
  }
}