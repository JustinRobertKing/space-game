console.log('fuck you')

var game = new Phaser.Game(1000, 679, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var space;

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
    space = game.add.tileSprite(0, 0, 1000, 679, 'space2');
    // stars2 = game.add.tileSprite(0, 0, 1000, 679, 'stars2')
    stars1 = game.add.tileSprite(0, 0, 1000, 679, 'stars1')
    stars1Flipped = game.add.tileSprite(0, 0, 1000, 679, 'stars1Flipped')
        // The ship and its settings
    var ship = game.add.sprite(0, 0, 'ship1');
    ship.scale.setTo(.5, .5)

    //  We need to enable physics on the ship
    game.physics.arcade.enable(ship);

}

function update() {
    stars1.tilePosition.x -= 0.75;
    stars1Flipped.tilePosition.x -= 0.75;
    space.tilePosition.x -= 0.6;
}