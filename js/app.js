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

var player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

//player functions
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
}

player.prototype.score = function() {
    if (this.y < 0) {
        player.reset();
        score = score +1;
    }
};

player.prototype.death = function() {
    player.reset();

    lives = lives - 1;
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
    ctx.fillText(scoreDisplay, 400, 30);
}

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

//instantiating player and enemies
var player = new player(200,400);
var allEnemies = [];

var EnemyCount = 6;
for(var i = 0; i < EnemyCount; i++){
    allEnemies.push(new enemy(i));
}

var score = 0;
var lives = 3;

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
