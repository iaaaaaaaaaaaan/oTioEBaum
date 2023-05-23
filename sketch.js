var bg, bgImg
var tio, tioImg, tio_atirando;
var zombieImg, zombieGroup;
var bulletImg, bullet;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3;


var bulletos = 5;
var life = 3;
var reloading = false;


function preload(){
  bgImg = loadImage("assets/bg.jpeg");
  tioImg = loadImage("assets/shooter_2.png");
  tio_atirando = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie2.png");
  bulletImg = loadImage("assets/Bullets.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
}

function setup() {
  createCanvas(1300, 650);
  
  //adicionando a imagem de fundo
  bg = createSprite(660, 450, 30, 30);
  bg.addImage(bgImg);

  // adicionando o player! 
  tio = createSprite(180, 430, 50, 50);
  tio.addImage(tioImg);
  tio.scale = 0.3;


  // sprite da vida
  heart1 = createSprite(1000, 40, 20, 20);
  heart1.visible = false;
  heart1.addImage("heart1", heart1Img);
  heart1.scale = 0.4;

  heart2 = createSprite(950, 40, 20, 20);
  heart2.visible = false;
  heart2.addImage("heart2", heart2Img);
  heart2.scale = 0.4;

  heart3 = createSprite(1000, 40, 20, 20);
  heart3.addImage("heart3", heart3Img);
  heart3.scale = 0.4;
  
  //criando o grupo de zumbis
  zombieGroup = new Group();

  console.log(bulletos);
}


  function draw() {
  background("black");

  // logica para exibir a imagem das vidas
  if (life == 3){
    heart3.visible = true;
    heart2.visible = false;
    heart1.visible = false;
  }

  if (life == 2){
    heart3.visible = false;
    heart2.visible = true;
    heart1.visible = false;
  }

  if (life == 1){
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = true;
  }
  
  if (life == 0){
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = false;
    tio.destroy();
  }



  // movendo o player para baixo 
  if (keyDown("S") && tio.y < 590){
    tio.y += 3; 
  }
  //movendo o player para cima
  if (keyDown("W") && tio.y > 60){
    tio.y -= 3; 
  }

  if (keyDown("S") && keyDown("Q") && tio.y < 590){
    tio.y += 8; 
  }

  if (keyDown("W") && keyDown("Q") && tio.y > 60){
    tio.y -= 8; 
  }
  
  if (keyWentDown("SPACE") && bulletos > 0){
    bullet = createSprite(180, tio.y - 30, 20, 10);
    bullet.addImage(bulletImg);
    bullet.scale = 0.05;
    bullet.velocityX = 20;
    bullet.lifetime = 700;
    tio.addImage(tio_atirando);
    //bulletos--;
    bulletos = bulletos -1;
  }
  else if (keyWentUp("SPACE")){
    tio.addImage(tioImg);
  }
  
  if (keyWentDown("E") && bulletos < 5) {
    reloading = true;
    reloadTime = 60; 
    // 2 segundos (60 frames por segundo)
  }
  
  if (reloading) {
    reloadTime--;
    
    if (reloadTime <= 0) {
      bulletos = 5;
      reloading = false;
    }
  }

  if (zombieGroup.isTouching(tio)){
    for (var i=0; i<zombieGroup.length; i++){
      if (zombieGroup[i].isTouching(tio)){
        zombieGroup[i].destroy();
        life = life - 1;
      }
    }
  }

  
  // destruir o zumbi
 // if (bullet.isTouching(zombieGroup)){
 //   zombieGroup.destroyEach();
 // }

  spawnEnemy(); 
  drawSprites();
}




function spawnEnemy(){
  if (frameCount % 50 == 0){
    var zombie = createSprite(1300, random(100, 600), 40 ,40);
    zombie.addImage(zombieImg);
    zombie.scale = 0.6;
    zombie.velocityX = -3;
    zombie.lifetime = 700;

    zombieGroup.add(zombie);
  }
}