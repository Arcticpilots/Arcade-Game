
// Enemies our player must avoid

var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    //speed and reach of enemies
    this.speed = speed ;
    this.radius = 50 ;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt*this.speed ;
     // When arriving to the end of the canvas loop the enemies again
    if(this.x > 520){
      this.x = -10;
      this.speed = 50 + Math.floor(Math.random()*200);
    }
    //Check for collision : Enemies collied when their radius connects

    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.radius + this.radius) {
      // collision detected!
      player.x = 202;
      player.y = 405;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

var Player = function(x,y){
  //Position and radius (reach)
    this.x = x ;
    this.y = y;
    this.radius = 20 ;
  //Image of player
    this.sprite = 'images/char-pink-girl.png';
};
// Place the player object in a variable called player
const player = new Player(202,405);
let modal = document.querySelector(".modal");
let choosenChar = '';



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

  let allEnemies = [];

  let enemy1 = new Enemy(0,147,300);
  let enemy2 = new Enemy(0,230,500);
  let enemy3 = new Enemy(0,63,200);

  allEnemies.push(enemy1,enemy2,enemy3);

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(){
  if (this.y < 0) {
      setTimeout(function(){
      player.x = 202;
      player.y = 405;
    },500);
  }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed){
  if (keyPressed == 'left' && this.x > 0) {
        this.x -= 102;
    }

    if (keyPressed == 'right' && this.x < 405) {
        this.x += 102;
    }

    if (keyPressed == 'up' && this.y > 0) {
        this.y -= 83;
        }

    if (keyPressed == 'down' && this.y < 405) {
        this.y += 83;
    }
}


// Event listener for the character chosen to play with and the button to confirm it
$('.character').on('click', function(e){
  $(this).css("border","2px solid blue");
  choosenChar = $(this).attr('src');
  });

  $('.confirm').on("click", function(){
  modal.style.display = "none";
  player.sprite = choosenChar ;
  player.render();
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
