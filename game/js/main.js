console.log('fuck you')

var game = new Phaser.Game(1000, 679, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('space', 'img/space.jpg');
    game.load.image('ship1', 'img/ship1.png', 79, 41.5);
    game.load.image('ship2', 'img/ship2.png');
    game.load.image('ship3', 'img/ship3.png');
    game.load.image('ship4', 'img/ship4.png');
    // game.load.image('star', 'assets/star.png');

}

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  A simple background for our game
    game.add.sprite(0, 0, 'space');
    // The ship and its settings
    var ship = game.add.sprite(0, 0, 'ship1');
    ship.scale.setTo(.5, .5)

    //  We need to enable physics on the ship
    game.physics.arcade.enable(ship);

}

function update() {
}