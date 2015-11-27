//enemy class
var enemy = function(x,y) {
    //set spawn locations for enemies
    spawnPoints = [50,140,225];
    spawnChoice = spawnPoints[Math.floor(Math.random()*spawnPoints.length)];
    this.x = Math.random()* -500;;
    this.y = spawnChoice;

    this.sprite = 'images/enemy-bug.png';
};

enemy.prototype.update = function(dt) {
    //set enemy speed
    speed = [25,50,75,100,350,400,550];
    speedChoice = speed[Math.floor(Math.random()*speed.length)];

    this.x = this.x + speedChoice * dt;

    //delete enemies that reach far side of screen and spawn new enemies
    if (allEnemies.length < 7 && this.x -100 > 700) {
        allEnemies.splice(this, 1);
        allEnemies.push(new enemy(i));
    }

    //collision detection
    for(var i = 0; i <= allEnemies.length; i++){
       if (player.x < this.x + 35 && player.x + 50 > this.x && player.y < this.y + 0 && player.y + 20 > this.y){
        player.death();
        }
    }

};

enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player class
var player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

player.prototype.handleInput = function (key) {
        switch (key){
        case 'left': this.x = this.x - 100;
        break;
        case 'right': this.x = this.x + 100;
        break;
        case 'up': this.y = this.y - 90;
        break;
        case 'down': this.y = this.y + 90;
        break; 
    }
};

player.prototype.reset = function() {
    player.x = 200;
    player.y = 400;

    allHearts.splice(0, allHearts.length);

    allGems.splice(0, allGems.length);

    newRound = true;
}

player.prototype.score = function() {
    if (this.y < 0) {
        player.reset();
        score = score + 5;
    }
};

player.prototype.death = function() {
    player.reset();

    lives = lives - 1;

    if (lives === 0) {
        lives = 3;
        score = 0;
    }
}

player.prototype.stats = function() {
    livesDisplay = "Lives: " + lives;
    ctx.clearRect(0,0,200,50);
    ctx.font = "26px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText(livesDisplay, 0, 30);

    var scoreDisplay = "Score: " + score;
    ctx.clearRect(400,0,200,50);
    ctx.font = "26px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText(scoreDisplay, 380, 30);
};

//player class
player.prototype.update = function(dt) {
    //preventing movement off the edge of the canvas
    if (this.x < 0) {
        this.x = 0;
    }
    else if (this.x > 400) {
        this.x = 400;
    }
    else if (this.y > 400) {
        this.y = 400;
    }
    
    player.score();
    player.stats();
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//heart class
var heart = function(x,y) {
    var xLocation = [0,101,303,404];
    var xChoice = xLocation[Math.floor(Math.random()*xLocation.length)];
    var yLocation = [306,407];
    var yChoice = yLocation[Math.floor(Math.random()*yLocation.length)];

    this.x = xChoice;
    this.y = yChoice;

    this.sprite = 'images/Heart.png';
};

heart.prototype.update = function(dt) {
    var heartChance = Math.random();

    if (allHearts < 1 && newRound === true) {
        allHearts.push(new heart(i));
        newRound = false
    }

    if (gem.x == this.x + 50 && gem.x + 50 == this.x && gem.y == this.y + 80 && gem.y + 80 == this.y) {
        allHearts.splice(this, 1);
    }

    for(var i = 0; i <= allHearts.length; i++){
       if (player.x < this.x + 75 && player.x + 75 > this.x && player.y < this.y + 80 && player.y + 80 > this.y){
            lives = lives + 1;
            allHearts.splice(this, 1);
        }
    }
};

heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var gem = function(x,y){
    var xLocation = [0,101,303,404];
    var xChoice = xLocation[Math.floor(Math.random()*xLocation.length)];
    var yLocation = [122,206,287,387];
    var yChoice = yLocation[Math.floor(Math.random()*yLocation.length)];

    this.x = xChoice;
    this.y = yChoice;

    var sprites = ['images/gemBlue.png', 'images/gemGreen.png', 'images/gemOrange.png'];
    var spriteChoice = sprites[Math.floor(Math.random()*sprites.length)];
    this.sprite = spriteChoice;
};

gem.prototype.update = function(dt) {
    if (allGems.length < 1) {
        allGems.push(new gem(i));
    }

    for(var i = 0; i <= allGems.length; i++){
       if (player.x < this.x + 75 && player.x + 75 > this.x && player.y < this.y + 100 && player.y + 100 > this.y){
            score = score + 1;
            allGems.splice(this, 1);
            }
    }
};

gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//instantiating player and enemies
var player = new player(200,400);

var allEnemies = [];
var EnemyCount = 6;
for(var i = 0; i < EnemyCount; i++){
    allEnemies.push(new enemy(i));
}

//initializing stats
var score = 0;
var lives = 3;
var newRound = true;

//instantiating hearts
var allHearts = [];
for (var i = 0; i < 1; i++){
    allHearts.push(new heart(i));
}

//instantiating gems
var allGems = [];
for (var i = 0; i < 1; i++){
    allGems.push(new gem(i));
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
