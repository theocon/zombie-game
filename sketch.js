var payer, shooterImg, shooter_shooting;

var heart1, heart2, heart3;
var heart1Image, heart2Image, heart3Image;

var zombie, zombieImg;
var bg, bgImg;

var zombieGroup;

var bullets = 70;

var gameState = "fight"

function preload(){
  heart1Image = loadImage("assets/heart_1.png");
  heart2Image = loadImage("assets/heart_2.png");
  heart3Image = loadImage("assets/heart_3.png");

  shooterImg = loadImage("assets/shooter_2.png ");
  shooter_shooting = loadImage("assets/shooter_3.png");

  zombieImg = loadImage("assets/zombie.png");

  bgImg = loadImage("assets/bg.jpeg");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(displayWidth/2-20, displayHeight/2 - 40,20,20);
bg.addImage(bgImg);
bg.scale = 1.1;

player = createSprite(displayWidth - 1150, displayHeight - 300, 50,50);
  player.addImage(shooterImg);
  player.scale = 0.3;
  player.debug = true;
  player.setCollider("rectangle" ,0, 0, 300, 300);


  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1Image)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2Image)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3Image)
  heart3.scale = 0.4

  bulletGroup = new Group();
  zombieGroup = new Group();
}



function draw(){
  background(0);

  if(gameState === "fight"){
    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y - 30;
    }
  
    if(keyDown("DOWN_ARROW")||touches.length>0){
      player.y = player.y + 30
    }
  
     else if(keyWentDown("space")){
      player.addImage(shooter_shooting);
    }
  
    if (keyWentUp("space")){
      bullet = createSprite(displayWidth-1150,player.y-30,20,10)
      bullet.velocityX = 20

      bulletGroup.add(bullet)
      player.depth = bullet.depth
      player.depth = player.depth+2
      player.addImage(shooterImg);
      bullets = bullets-1
    }

    else if(keyWentUp("space")){
      player.addImage(shooterImg)
    }

    if(bullets==0){
      gameState = "bullet"
    }

    if(zombieGroup.isTouching(bulletGroup)){
      for(var i=0;i<zombieGroup.length;i++){

        if(zombieGroup[i].isTouching(bulletGroup)){
          zombieGroup[i].destroy()
          bulletGroup.destroyEach()
        }
      }
    }
  
    if(zombieGroup.isTouching(player)){
       for(var i=0;i<zombieGroup.length;i++){
         if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy()
         }
       }
    }
  
  
    enemy();
  }

 

  drawSprites();
}

if(gameState == "lost"){
   textSize(100)
   Fill("red")
   text("you lost",400,400)
   zombieGroup.destroyEach();
   player.destroy();
}

else if(gameState =="won"){
  textSize(100)
  fill("yellow")
  text("you won", 400,400)
  zombieGroup.destroyEach();
  player.destroy();
}

else if(gameState == "bullet"){
   textSize(50)
   fill("yellow")
   text("you ran out of bullets!!!",470,410)
   zombieGroup.destroyEach();
   player.destroy();
   bulletGroup.destroyEach();
}

function enemy(){
  if(frameCount%50===0){
     
    zombie = createSprite(random(500,1100), random(100,500))

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,zombie.height-110)

    zombie.lifetime = 400
    zombieGroup.add(zombie)
  }

}







