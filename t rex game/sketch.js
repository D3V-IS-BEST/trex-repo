  //define variables here
  var dino, dinorun;
  var ground,groungimage,falseground;
  var cloud,cloudimage
  var obstacle,obstacleimg1,obstacleimg2,obstacleimg3,obstacleimg4,obstacleimg5,obstacleimg6;
  var score;
  var cloudgroup;
  var obstaclegroup 
  var PLAY=2
  var END =1
  var gamestate = 2
  var dinostop
  var gameover
  var gameoover
  var restart
  var restartimg
  var diesound
  var jumpsound
  var checkpointsound
  
  //load  images, animations, sounds etc
  function preload(){

  dinorun=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundimage=loadImage("ground2.png")
  cloudimage=loadImage("cloud.png")
  obstacleimg1=loadImage("obstacle1.png")
  obstacleimg2=loadImage("obstacle2.png")
  obstacleimg3=loadImage("obstacle3.png")
  obstacleimg4=loadImage("obstacle4.png") 
  obstacleimg5=loadImage("obstacle5.png") 
  obstacleimg6=loadImage("obstacle6.png") 
   dinostop=loadImage("trex_collided.png")
  gameover=loadImage("gameOver.png")
restartimg=loadImage("restart.png")
  diesound=loadSound("die.mp3")
  jumpsound=loadSound("jump.mp3")
 checkpointsound=loadSound("checkPoint.mp3")
  
  
  }

  //execute commands only once
  function setup(){
    //            x-600(width),y-200(height)
  createCanvas(600,200);
    
  //create an animated sprite for dino
  dino=createSprite(50,150);
  dino.addAnimation("dinorun",dinorun) ;
    dino.addImage("dinostop",dinostop)
  dino.scale=0.5;

    
  //create a ground image sprite
  ground=createSprite(300,180)
  ground.addImage("groundimage",groundimage)

  //create a game over sprite
    gameoover=createSprite(300,100)
    gameoover.addImage("gameover",gameover)
    
    
  //create restart img
    restart=createSprite(300,140)
    restart.addImage("restartimg",restartimg)
    restart.scale=0.56                
   //create false ground
    falseground=createSprite(50,190,100,10)
    falseground.visible = false
    
 score = 0;
    
  cloudgroup=new Group()
  obstaclegroup=new Group()
  
    
    dino.debug = false
    
    dino.setCollider("circle",0,0,42)
}
  //execute commandas multiple times
  function draw(){
    
    
    
    
    
    
    
    
  //avoid the repetetion of a sprite
  background("light grey");
  drawSprites();
  
    if(gamestate===2){
        ground.velocityX=-(7+score/100*4);
      hailhitler();
    protectionwipes();
       //to create infinite grounds
  if(ground.x<0)
  {
    ground.x = 300;
  }
     
    //to jump the dino
    if(keyDown("SPACE")&& dino.y>150){
     dino.velocityY = -13     
 jumpsound.play();
    
    } 
      //adding gravity
    dino.velocityY = dino.velocityY + 1
      score=score+Math.round(frameRate()/60)
if(score%100===0  && score>0){
checkpointsound.play()
}
    if(obstaclegroup.isTouching(dino)){
        gamestate=1;
      diesound.play()
    ;
      
      }
      gameoover.visible=false
 restart.visible=false
    }
   if(gamestate===1){
     ground.velocityX=0
     obstaclegroup.setVelocityXEach(0)
     cloudgroup.setVelocityXEach(0)
     obstaclegroup.setLifetimeEach(-11)
     cloudgroup.setLifetimeEach(-12)
     dino.velocityY=0
     dino.changeImage("dinostop",dinostop)
  
   gameoover.visible=true
   restart.visible=true
     if(mousePressedOver(restart))

       {
        gamestate=2;
         obstaclegroup.destroyEach()
         cloudgroup.destroyEach()
     score=0
        dino.changeAnimation("dinorun",dinorun) 
       }
   } 
    
    
    
   
    
 
    
  
  

    
    
    //to make a dino collide with the ground
    dino.collide(falseground)
    
    
    text("count :"+score,300,50)
    
  }

function hailhitler(){
if(frameCount%99===0){
       cloud=createSprite(580,10)
      cloud.y= random(10,150)
    cloud.addImage("cloudimage",cloudimage)
    cloud.velocityX= -4
   cloud.scale=0.8
      cloud.depth=dino.depth
      dino.depth += 1
      //dino.depth=dino.depth+1  
      console.log(cloud.depth)
       cloud.lifetime = 120 
  cloudgroup.add(cloud)
}
}





function protectionwipes(){
 if(frameCount%80===0){
   obstacle=createSprite(559,160)
   obstacle.velocityX= -(4+score/100) 
   var a = Math.round(random(1,6))
   switch(a){
     case 1 :obstacle.addImage(obstacleimg1)
       break;
       case 2:obstacle.addImage(obstacleimg2)
       break;
      case 3:obstacle.addImage(obstacleimg3)
       break;
       case 4:obstacle.addImage(obstacleimg4)
       break;
       case 5:obstacle.addImage(obstacleimg5)
       break;
       case 6:obstacle.addImage(obstacleimg6)
       break;
   }
   
   obstacle.scale = 0.45
   obstacle.lifetime =135
   
   obstaclegroup.add(obstacle)
 } 
  
  
  
  
}