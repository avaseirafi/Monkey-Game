var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

var ground, groundImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 400);

  var message = "This is a message";
 console.log(message)
  
  monkey = createSprite(50,360,20,50);
  monkey.addAnimation("running", monkey_running);
  
  

  monkey.scale = 0.2;
  
  
  ground = createSprite(200,380,1000,20);
  ground.x = ground.width/2;

  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  score = 0;
  

  
}


function draw() {
 background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 300){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -10;
      console.log("check");
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        //trex.velocityY = -12;
        gameState = END;
    }
  }
   else if (gameState === END) {
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  monkey.collide(ground);
  
  drawSprites();
  
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,350,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacleImage);

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale=0.2;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}








