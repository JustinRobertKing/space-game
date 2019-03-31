console.log('fuck you')

var game = new Phaser.Game(1440, 765, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var space;
var cursors;
var ship;
var score = 0;
var scoreText; 

function preload() {

    game.load.image('space2', 'img/space2.jpg');
    game.load.image('stars1', 'img/stars1.png');
    game.load.image('stars1Flipped', 'img/stars1Flipped.png');    
    game.load.image('stars2', 'img/stars2.png');
    game.load.image('ship1', 'img/ship1.png');
    game.load.image('ship2', 'img/ship2.png');
    game.load.image('ship3', 'img/ship3.png');
    game.load.image('ship4', 'img/ship4.png');
    // game.load.image('star', 'assets/star.png');

}

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  A simple background for our game
    space = game.add.tileSprite(0, 0, 1440, 765, 'space2');
    stars1 = game.add.tileSprite(0, 0, 1440, 765, 'stars1');
    stars1Flipped = game.add.tileSprite(0, 0, 1440, 765, 'stars1Flipped');
    // Add the ship
    ship = game.add.sprite(0, 325, 'ship1');
    // Shrink it down
    ship.scale.setTo(.5, .5);
    //  We need to enable physics on the ship
    game.physics.arcade.enable(ship);

    ship.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();
    // game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);

    scoreText = game.add.text(game.width - 200, 16, 'Score: 0', { fontSize: '32px', fill: 'hotpink', borderColor: 'hotpink' });

    game.time.events.loop(Phaser.Timer.SECOND * .01, scorePoints, this);

}

function update() {
    space.tilePosition.x -= 0.6;
    stars1.tilePosition.x -= 0.75;
    stars1Flipped.tilePosition.x -= 0.75;

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
}

function scorePoints() {
    score += 1;
    scoreText.text = 'Score: ' + score;
}