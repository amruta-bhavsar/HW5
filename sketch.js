var ADP = 725 ^ 2 + 625 ^ 2;
var BCP = 775 ^ 2 + 625 ^ 2;
var CBP = 725 ^ 2 + 675 ^ 2;
var DAP = 775 ^ 2 + 675 ^ 2;
var maxDist;
var gameStarted = 0;
//SecretX and SecretY will be the random position of the hidden target
var secretX;
var secretY;
var targetFound = 0;
var distRatio;
var dimX = 50;
var dimY = 50;
var fade;
var fadeAmount = 1;

let img;

function preload() {
  img = loadImage('cat.png');
  soundFormats('wav');
  mySound = loadSound('meow.wav');
  frameRate = 10;
}

function setup() {
  cnv = createCanvas(800, 700);
  background(random(0,255));
  // //makes location a whole number; lets you know location in the console
  secretX = Math.round(random(25, 625));
  secretY = Math.round(random(25, 600));
  print('secretX = ' + secretX);
  print('secretY = ' + secretY);
  //setTimeout (anim, 3000);
  fade = 0;
  maxDist = Math.round (sqrt(DAP));
  print('maxDist ' + maxDist);
}

function draw() {
  if (targetFound == 0 && gameStarted == 0 ) {
    background(0,0,0,20);
    //rectangle that follows the cat image and hides it (FOR DEBUGGING)
    // fill(255);
    // rect(secretX, secretY, 50,50);
    //start button
    fill(255,255,255, fade*2);
    strokeWeight(3);
    stroke(150, 150, 150);
    rect(300, 330, 200, 50, 20);
    textSize(32);
    noStroke();
    fill(150, 150, 150);
    text('start', 365, 365);
    //Instructions
    textSize(32);
    fill(200, 200, 200, fade);
    text('Click around the screen to find the cat!', 120, 500);
    if (fade<0.5) 
      fadeAmount=0.4;
      
    fade += fadeAmount;
    

   // stops function from repeating
  } else if (targetFound == 1 && gameStarted == 0) {
      
      
    background(0, 15);
    var x = random(width);
    var y = random(height);
    var weight = random(5, 10);
    strokeWeight(weight);
    line(secretX, secretY, x, y);
    // play again button
    fill(255,255,255, fade);
      strokeWeight(3);
      stroke(150, 150, 150);
      rect(300, 330, 200, 50, 20);
      textSize(32);
      noStroke();
      fill(150, 150, 150);
      text('play again', 330, 365);
      if (fade<0.5) fadeAmount=0.4;
      fade += fadeAmount;
      print('gameStarted = ' + gameStarted, 'targetFound = ' + targetFound);
      image(img, secretX, secretY);
      
      }
  }

//makes it so that only when you click within the button area the screen changes

function mousePressed() {
  if (gameStarted == 0) {
    if (mouseX >= 300 && mouseX <= 500 && mouseY >= 330 && mouseY <= 380) {
    //debugging stuff
      if (targetFound == 0)
        print('start clicked');
      else
        print('again clicked');
      fill(0);
      rect(0, 0, 800, 700);
      //fill(255);
        //makes location a whole number; lets you know location in the console
    secretX = Math.round(random(25, 625));
    secretY = Math.round(random(25, 600));
    print('secretX = ' + secretX);
    print('secretY = ' + secretY);
    rect(secretX, secretY, dimX, dimY);
    gameStarted = 1;
    }
  } else {
    //sound only plays when you click
    cnv.mouseClicked(function() {
      if (mySound.isPlaying()) {
        mySound.stop();
      } else {
        mySound.play();
      }
      // calculate mouse to target distance
      let d = Math.round (dist(secretX, secretY, mouseX, mouseY));
      distRatio = Math.round (d / maxDist);
      print('mouse X = ' + mouseX, 'mouseY = ' + mouseY, 'dist to target = ' + d, 'dist ratio = ' + distRatio);
      // fill(255);
      // rect(secretX, secretY, 50, 50);
      mySound.setVolume(1.5 / distRatio);
      mySound.play();
      
      noFill();
      strokeWeight(3);
      stroke((255 / distRatio)*2);
      ellipse(mouseX, mouseY, 50, 50);
    });

    if (mouseX >= secretX && mouseX <= secretX + dimX && mouseY >= secretY && mouseY <= secretY + dimY) {
      gameStarted = 0;
      targetFound = 1;
      image(img, secretX, secretY);
      fill(0);
      rect(0, 0, 800, 700);
    }
  }  
}




