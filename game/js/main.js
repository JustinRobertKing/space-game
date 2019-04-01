function addGroup(newThing, amount, sprite) {
    newThing = game.add.group();
    newThing.enableBody = true;
    newThing.physicsBodyType = Phaser.Physics.ARCADE;
    newThing.createMultiple(amount, sprite);
    newThing.setAll("outOfBoundsKill", true);
    newThing.setAll("checkWorldBounds", true);
    return newThing;
}
console.log('fuck you')

var game = new Phaser.Game(1440, 765, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var space;
var cursors;
var ship;
var bluePlasma;
var score = 0;
var scoreText; 
var yourScoreText
var scorePoints;
var alienSpaceShips;
var alienMediumShips;
var alienCannons;

function preload() {
    // Load background images
    game.load.image('space2', 'img/space2.jpg');
    game.load.image('stars1', 'img/stars1.png');
    game.load.image('stars1Flipped', 'img/stars1Flipped.png');    
    game.load.image('stars2', 'img/stars2.png');
    // Load ship images
    game.load.image('ship1', 'img/ship1.png');
    game.load.image('ship2', 'img/ship2.png');
    game.load.image('ship3', 'img/ship3.png');
    game.load.image('ship4', 'img/ship4.png');
    game.load.image('blueShip1', 'img/blueship1.png');
    game.load.image('blueShip2', 'img/blueship2.png');
    game.load.image('blueShip3', 'img/blueship3.png');
    game.load.image('blueShip4', 'img/blueship4.png');
    // Load enemy images
    game.load.image('alienSpaceShip', 'img/alienspaceship.png');
    game.load.image('alienMediumShip', 'img/aliensprite.png');
    game.load.image('alienCannon', 'img/F5S3.png')
    // Load projectile images
    game.load.spritesheet('bluePlasma', 'img/bluePlasma.png', 256, 300)
}

function create() {
    //  Enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  Create a parallax background
    space = game.add.tileSprite(0, 0, 1440, 765, 'space2');
    stars1 = game.add.tileSprite(0, 0, 1440, 765, 'stars1');
    stars1Flipped = game.add.tileSprite(0, 0, 1440, 765, 'stars1Flipped');
    // Add the ship
    ship = game.add.sprite(100, game.world.centerY, 'ship1');
    //  We need to enable physics on the ship
    game.physics.arcade.enable(ship);
    ship.enableBody = true
    // Shrink it down
    ship.scale.setTo(.4, .4);
    ship.anchor.setTo(.5);
    ship.body.setSize(20, 20, 0, 0)

    ship.body.collideWorldBounds = true;

    // Create enemy ships
    alienSpaceShips = addGroup(alienSpaceShips, 2000, "alienSpaceShip");
    alienMediumShips = addGroup(alienMediumShips, 1000, "alienMediumShip")
    alienCannons = addGroup(alienCannons, 500, "alienCannon")
    bluePlasma = addGroup(bluePlasma, 1000, 'bluePlasma')

    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);

    scoreText = game.add.text(game.width - 200, 16, 'Score: 0', { fontSize: '32px', fill: 'hotpink' });
    yourScoreText = game.add.text(game.world.centerX, game.world.centerY, "", { font: '300px Arial' , fill: 'hotpink' });
    yourScoreText.anchor.setTo(.5);

    scorePoints = game.time.events.loop(Phaser.Timer.SECOND * .01, scorePoints, this);
    game.time.events.loop(Phaser.Timer.SECOND * .5, spawnSmallEnemies, this)
    game.time.events.loop(Phaser.Timer.SECOND * 2, spawnMediumEnemies, this)
    game.time.events.loop(Phaser.Timer.SECOND * 6, spawnCannonEnemies, this)
}

function update() {
    space.tilePosition.x -= 0.6;
    stars1.tilePosition.x -= 0.75;
    stars1Flipped.tilePosition.x -= 0.75;

    game.physics.arcade.overlap(ship, alienSpaceShips, gameOver, null, this);
    game.physics.arcade.overlap(ship, alienMediumShips, gameOver, null, this);
    game.physics.arcade.overlap(ship, alienCannons, gameOver, null, this);
    
    // Stop the ship from moving
    ship.body.velocity.x = 0
    ship.body.velocity.y = 0

   if(cursors.left.isDown){
        ship.body.velocity.x = -300;
    } else if(cursors.right.isDown){
        ship.body.velocity.x = 300;
    } if (cursors.up.isDown){
        ship.body.velocity.y = -300;
    } else if (cursors.down.isDown){
        ship.body.velocity.y = 300;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        shootWeapon();
    }
}

function scorePoints() {
    score += 1;
    scoreText.text = 'Score: ' + score;
}

function spawnSmallEnemies() {
     // Create small enemy ships
    var alienSpaceShip = alienSpaceShips.getFirstExists(false)
    alienSpaceShip.reset(game.width, game.rnd.frac() * 700);
    alienSpaceShip.scale.setTo(.2, .2);
    alienSpaceShip.body.velocity.x = -300
    alienSpaceShip.body.velocity.y = (.5 - Math.random()) * 100 
}

function spawnMediumEnemies() {
     // Create small enemy ships
    var alienMediumShip = alienMediumShips.getFirstExists(false)
    alienMediumShip.reset(game.width, game.rnd.frac() * 700);
    alienMediumShip.scale.setTo(.5, .5);
    alienMediumShip.body.velocity.x = -300
    alienMediumShip.body.velocity.y = (.5 - Math.random()) * 100 
}

function spawnCannonEnemies() {
     // Create small enemy ships
    var alienCannon = alienCannons.getFirstExists(false)
    alienCannon.reset(game.width, game.rnd.frac() * 700);
    alienCannon.body.velocity.x = -300
    alienCannon.body.velocity.y = (.5 - Math.random()) * 100 
}

function shootWeapon() {
    var bluePls = bluePlasma.getFirstExists(false)
    bluePls.reset(ship.x + 20, ship.y + 28)
    bluePls.angle = -90
    bluePls.scale.setTo(.2, .2)
    bluePls.animations.add('shoot', 
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16, 17, 18, 19, 
        20, 21, ,22, 23, 24, 25, 26, 27, 28, 29, 
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
        41, 42, 43, 44, 45, 46, 47, 48], 
        20, true);
    bluePls.animations.play('shoot')
    bluePls.body.velocity.x = 600
}

function gameOver(ship, enemy) {
    ship.kill();
    game.time.events.remove(scorePoints);
    scoreText.text = "";
    yourScoreText.text = score;
} 

function render() {

}


    // alienSpaceShip = game.add.sprite(game.width, game.rnd.frac() * 700, 'alienSpaceShip');
    // alienSpaceShip.scale.setTo(.2, .2);
    // game.physics.arcade.enable(alienSpaceShip);
    // alienSpaceShip.enableBody = true
    // alienSpaceShip.body.velocity.x = -300
    // alienSpaceShip.body.velocity.y = (.5 - Math.random()) * 100 