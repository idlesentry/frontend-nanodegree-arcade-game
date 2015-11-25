var enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

enemy.prototype.update = function(dt) {
    this.x = this.x + (Math.floor((Math.random() * 500))) * dt;
    if (this.x > 500) {
        this.x = 0; 
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

player.prototype.collision = function() {
for(var i = 0; i <= allEnemies.length; i++){
       if (player.x < allEnemies[i].x + 50 && player.x + 50 > allEnemies[i].x && player.y
         < allEnemies[i].y + 100 && player.y + 100 > allEnemies[i].y){
            return true;
        }
        else {
            return false;
        }
    }
};

player.prototype.reset = function() {
    player.x = 200;
    player.y = 400;
}

player.prototype.update = function(dt) {
     if (this.x < 0) {
        this.x = 0;
    }
    else if (this.x > 400) {
        this.x = 400;
    }
    else if (this.y > 400) {
        this.y = 400;
    }

    if (this.y < 0) {
        player.reset();
    }

    if (player.collision() == true) {
        player.reset();
    }
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var player = new player(200,400);
var enemy1 = new enemy(-100,50);
var enemy2 = new enemy(-100,140);
var enemy3 = new enemy(-100,225);

var allEnemies = [enemy1,enemy2,enemy3];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
