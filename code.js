var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var count=1;
var boxGroup=createGroup();
var score=0;
var gameState="serve";
var lives=3;
var vx,vy;

function gameServe(){
  ball.velocityX=0;
  ball.velocityY=0;
  ball.x=200;
  ball.y=320;
  boxGroup.setVelocityYEach(0);
}

function gamePlay(){
  ball.bounceOff(topEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  ball.bounceOff(paddle);
  ball.bounceOff(boxGroup,vanish);
  paddle.x=World.mouseX;
  if(score===210){
    textSize(30);
    text("YOU WIN!",110,200);
    ball.velocityX=0;
    ball.velocityY=0;
    paddle.x=200;
  }
  if (ball.isTouching(bottomEdge)){
    gameEnd();
  }
  boxGroup.setVelocityYEach(0.1);
}

function gameEnd(){
  lives=lives-1;
  if (lives>=1){
    gameState="serve";
  }else{
    gameState="end";
    boxGroup.setVelocityYEach(0);
  }
}

//giving each row different colours
/*var colours=["blue","red","yellow"];
for(var r=1;r<=3;r=r+1){
  for(var a=25;a<400;a=a+50){
    var box1=createSprite(a,r*50,40,40);
    box1.shapeColor=colours[r-1];
  }
}*/
//giving each box different colours
for(var r=1;r<=3;r=r+1){
  for(var a=1;a<=7;a=a+1){
    var box=createSprite(a*50,r*50,40,40);
    boxGroup.add (box);
    if (count%2==0){
      box.shapeColor="blue";
    }else{
      box.shapeColor="red";
    }
    count++;
  }
}
createEdgeSprites();
var paddle=createSprite(200,370,75,10);
var ball=createSprite(200,320,15,15);
function draw() {
  background("white");
  textSize(15);
  fill("purple");
  if(gameState==="serve"){
    text("PRESS ENTER TO SERVE",100,300);
    gameServe();
  }else if(gameState==="play"){
    gamePlay();
  }else if (gameState==="end"){
    gameEnd();
    text("YOU LOST!!!",150,300);
  }
  
  if (keyDown("ENTER")&&gameState==="serve"){
    ball.velocityY=-3;
    ball.velocityX=2;
    gameState="play";
  }
  
  if(keyDown("space")){
    if (gameState==="play"){
      gameState="pause";
      vy=ball.velocityY;
      vx=ball.velocityX;
      ball.velocityY=0;
      ball.velocityX=0;
      boxGroup.setVelocityYEach(0);
    }else if(gameState==="pause"){
      gameState="play";
      ball.velocityY=vy;
      ball.velocityX=vx;
    }
      
    }
  textSize(20);
  text("score:"+score,300,20);
  text("Lives:"+lives,30,20);
  
  drawSprites();
}


function vanish(ball,box){
  box.destroy();
  score=score+10;
  
  if(ball.velocityY<=12&&ball.velocityY>=-12){
    ball.velocityX*=1.05;
    ball.velocityY*=1.05;
  }
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
