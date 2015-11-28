//enemy class
var enemy = function(x, y) {
    //set spawn locations for enemies
    spawnPointY = [50, 140, 225];
    spawnPointX = [-200,-300,-400,-500,-600,-700,-800];
    spawnChoiceX = spawnPointX[Math.floor(Math.random() * spawnPointX.length)];
    spawnChoiceY = spawnPointY[Math.floor(Math.random() * spawnPointY.length)];
    this.x = spawnChoiceX;
    this.y = spawnChoiceY;

    this.sprite = 'images/enemy-bug.png';
};

enemy.prototype.update = function(dt) {
    //set enemy speed
    speed = [1, 25, 50];
    speedChoice = speed[Math.floor(Math.random() * speed.length)];

    for (var i = 0; i <= allEnemies.length; i++) {
        this.x = this.x + speedChoice * dt;
    }

    //collision detection
    for (var i = 0; i <= allEnemies.length; i++) {
        if (player.x < this.x + 35 && player.x + 50 > this.x && player.y < this.y + 0 && player.y + 20 > this.y) {
            player.death();
        }
    }

    //delete enemies that reach far side of screen
    if (this.x - 110 > 750) {
        allEnemies.splice(this, 1);
    }

    //spawns new enemies if enemy number is less than 7
    setTimeout(function(){
        if (allEnemies.length < 8){
        allEnemies.push(new enemy(i));
        }
    }, 1500);
};

enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player class
var player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.x = this.x - 100;
            break;
        case 'right':
            this.x = this.x + 100;
            break;
        case 'up':
            this.y = this.y - 90;
            break;
        case 'down':
            this.y = this.y + 90;
            break;
    }
};

player.prototype.round = function() {
    if (this.y < 0) {
        player.reset();
        score = score + 5;
    }
};

player.prototype.reset = function(newRound) {
    player.x = 200;
    player.y = 400;
    newRound = true;

    //remove all gems and hearts at end of round
    allHearts.splice(0, allHearts.length);
    allGems.splice(0, allGems.length);

    //respawn enemies upon game over
    if (lives === 0) {
        var allEnemies = [];
        for (var i = 0; i < 7; i++) {
            setTimeout(function(){
            allEnemies.push(new enemy(i));
            }, 1000);
        }
    }

    //reset gem and heart spawns on new round
    if (allGems.length < 1 && allHearts <1 && newRound) {
        allGems.push(new gem(i));
        allHearts.push(new heart(i));
        newRound = false;
    }
};

player.prototype.death = function(newRound) {
    player.x = 200;
    player.y = 400;

    newRound = true;
    lives = lives - 1;

    //resets stats and clears enemies upon game over
    if (lives === 0) {
        lives = 3;
        score = 0;

        allEnemies.splice(0, allEnemies.length);
    }
};

player.prototype.stats = function() {
    livesDisplay = "Lives: " + lives;
    ctx.clearRect(0, 0, 200, 50);
    ctx.font = "26px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText(livesDisplay, 0, 30);

    var scoreDisplay = "Score: " + score;
    ctx.clearRect(400, 0, 200, 50);
    ctx.font = "26px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText(scoreDisplay, 380, 30);
};

player.prototype.update = function(dt) {
    //preventing movement off the edge of the canvas
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y > 400) {
        this.y = 400;
    }

    player.round();
    player.stats();
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//heart class
var heart = function(x, y) {
    var xLocation = [0, 101, 303, 404];
    var xChoice = xLocation[Math.floor(Math.random() * xLocation.length)];
    var yLocation = [140, 235, 320, 425];
    var yChoice = yLocation[Math.floor(Math.random() * yLocation.length)];

    this.x = xChoice;
    this.y = yChoice;

    this.sprite = 'images/Heart.png';
};

heart.prototype.update = function() {
    for (var i = 0; i <= allHearts.length; i++) {
        if (player.x < this.x + 75 && player.x + 75 > this.x && player.y < this.y + 75 && player.y + 75 > this.y) {
            lives = lives + 1;
            allHearts.splice(this, 1);
        }
    }
};

heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//gem class
var gem = function(x, y) {
    var xLocation = [0, 101, 303, 404];
    var xChoice = xLocation[Math.floor(Math.random() * xLocation.length)];
    var yLocation = [122, 206, 287, 387];
    var yChoice = yLocation[Math.floor(Math.random() * yLocation.length)];

    this.x = xChoice;
    this.y = yChoice;

    var sprites = ['images/gemBlue.png', 'images/gemGreen.png', 'images/gemOrange.png'];
    var spriteChoice = sprites[Math.floor(Math.random() * sprites.length)];
    this.sprite = spriteChoice;
};

gem.prototype.update = function() {
    for (var i = 0; i <= allGems.length; i++) {
        if (player.x < this.x + 75 && player.x + 75 > this.x && player.y < this.y + 75 && player.y + 50 > this.y) {
            score = score + 1;
            allGems.splice(this, 1);
        }
    }
};

gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//instantiating player and enemies
var player = new player(200, 400);

var allEnemies = [];
    for (var i = 0; i < 7; i++) {
        setTimeout(function(){
        allEnemies.push(new enemy(i));
    }, 1000);
}

//initializing stats
var score = 0;
var lives = 3;

//instantiating hearts
var allHearts = [];
for (var i = 0; i < 1; i++) {
    allHearts.push(new heart(i));
}

//instantiating gems
var allGems = [];
for (var i = 0; i < 1; i++) {
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