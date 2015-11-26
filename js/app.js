var enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

enemy.prototype.update = function(dt) {
    //set enemy speed
    this.x = this.x + (Math.floor((Math.random() * 500))) * dt;

    //reset when reaching end of canvas
    if (this.x > 500) {
        this.x = 0; 
    }

    //collision detection
    for(var i = 0; i <= allEnemies.length; i++){
       if (player.x < this.x + 50 && player.x + 50 > this.x && player.y
         < this.y + 0 && player.y + 100 > this.y){
        player.reset();
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
    if (this.y < 0) {
        player.reset();
    }

};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//instantiating player and enemies
var player = new player(200,400);

// enemy.prototype.spawn = function() {
//     var enemy = {
//     "enemy1": [{
//         "x": -100,
//         "y": 50,
//         "spawnCount": 0
//     }],
//     "enemy2": [{
//         "x": -100,
//         "y": 140,
//         "spawnCount": 0
//     }],
//     "enemy3": [{
//         "x": -100,
//         "y": 225,
//         "spawnCount": 0
//     }]
// };
//     var spawnCount = [0,0,0];
//     var spawnYlocation = [50,140,225];
//         for(var i = 0; i <= allEnemies.length; i++) {
//             if (spawnCount[i]= 0) {
//             spawnCount[i] = spawnCount[i] + 1;
//             var allEnemies[i] = new enemy(-100)
//     }
// }
var enemy1 = new enemy(-100,50);
var enemy2 = new enemy(-100,140);
var enemy3 = new enemy(-100,225);
var allEnemies = [enemy1, enemy2, enemy3];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
