var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var doorsGroup


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlocksGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 500, 40, 30);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5; 
  spookySound.play();   

  
  
  
  
}

function draw() {
  background(200);
  
  if(gameState == "play")
  {
    if(tower.y > 400){
        tower.y = 300
      }

    if(keyDown("left_arrow"))
    {
      ghost.x -= 2;
    }

    if(keyDown("right_arrow"))
    {
      ghost.x+=2;
    }

    if(keyDown("space"))
    {
      ghost.velocityY = -2;
    }

    ghost.velocityY += 0.5;
  

    if(ghost.isTouching(climbersGroup))
    {
      ghost.velocityY = 0;
    }
    
    drawSprites();
    spawnDoors();

    if(ghost.y>600 || ghost.isTouching(invisibleBlocksGroup))
    {
      gameState = "end";
      ghost.destroy();
    }
  }

  if(gameState == "end")
  {
    ghost.destroy();
    stroke("red");
    fill("red");
    textSize(30);
    text("Game Over", 300, 300)
  }
}

function spawnDoors()
{
  if(frameCount % 240 == 0)
  {
    door = createSprite(200, -100);
    door.addImage(doorImg);
    door.x = Math.round(random(100, 500))
    door.velocityY = 2;
    door.lifetime = 400;
    doorsGroup.add(door);

    climber = createSprite(door.x, door.y+70);
    climber.addImage(climberImg);
    climber.velocityY = door.velocityY;
    climber.lifetime = 400;
    climbersGroup.add(climber);

    ghost.depth = door.depth;
    ghost.depth +=1; 

    invisibleBlock = createSprite(climber.x, climber.y - 5);
    invisibleBlock.visible = false;
    invisibleBlock.velocityY = climber.velocityY;
    invisibleBlock.lifetime = 400;
    invisibleBlocksGroup.add(invisibleBlock);

  

  }


}
