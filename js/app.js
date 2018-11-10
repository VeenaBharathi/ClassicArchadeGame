// Enemies our player must avoid
var allEnemies = [];

// Enemy class
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
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
    this.x += Math.round((this.speed)*dt);  
    if(this.x>550) {
        this.x = -100;
        let index = allEnemies.indexOf(this);
        allEnemies.splice(index,1);
        pre_y = [0], y1 = 0, 
        setEnemies(setYAxis(), setSpeed());     
    }  
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class
var Player = function(x, y) {
     this.x = x;
     this.y = y;
     this.girl = 'images/char-cat-girl.png';
}

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    // if(this.x>=0 && this.x<=400 && this.y <=400 && this.y>=-20) 
     ctx.drawImage(Resources.get(this.girl), this.x, this.y);

     if(this.x < 0) {
        this.x = 400;
     }
     else if(this.x > 400) {
        this.x = 0;
     }
     else if(this.y < -20){
        this.y = 400;
     }
      else if(this.y > 400){
        this.y = 400;
     }

    //collision logic 
    let currX = this.x;
    let currY = this.y;
    allEnemies.forEach(function(enemy){
        if((enemy.x <= (currX+40) && enemy.x >= (currX-40)) && (enemy.y <= (currY+40) && enemy.y >= (currY-40))) {
               currX = 200;
               currY = 400;
        }
    });
    
    // set to normal position when collided
    this.x = currX;
    this.y = currY;
}

Player.prototype.handleInput = function(code) {
  // change position based on key presses
  // 37: 'left',38: 'up', 39: 'right', 40: 'down'
    switch(code) {
        case "left": 
            this.x-=100;
            if(this.x <= 0)
                this.x = 0;
            break;
        case "up": 
            this.y-=60;
            break;
        case "right": 
            this.x+=100;
            if(this.x >= 400)
                this.x = 400;
            break;
        case "down": 
            this.y+=60;
            if(this.y >= 400)
                this.y = 400;
            break;
    }

    // Game over when player reaches top
    if(this.y ===  -20) {
       gameOver();
    }
}

// changing y position of enemies randomly
var pre_y = [0], y1 = 0, flag;

function setYAxis() {
   y1 = Math.round((Math.random() * (300 - 60)) + 60);
   pre_y.forEach(function(pre) {
       if( Math.abs(y1 - pre) < 50) {
            flag =true;
            return null;
        }
    });
    if(flag != true) {
        pre_y.push(y1);  
        return y1;
    }
}

// set random speed to enemies
function setSpeed() {
    return (Math.random()*(400 - 60)) + 60;
}

// create 4 enemies with random speeds and positions
for(var i = 0; i<4; i++) {
    flag = false;
    var yaxis = setYAxis();
    var sp = setSpeed();
    if(yaxis != null){
            setEnemies.call(this, yaxis, sp);
    }
    else{
        i = i-1;
    }
}

// Now instantiate your objects. 
function setEnemies(yaxis, sp){
        var enemy = new Enemy(-100,yaxis,sp);
        // Place all enemy objects in an array called allEnemies
        allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player(200,400);

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

// Game over alert thrown when player reaches top. Game restarts.
function gameOver() {
         setTimeout(alert("game over!!! you won!!"), 1000);
        if(confirm) {
            window.location.reload(true);
        }
}