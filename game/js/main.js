console.log('fuck you')

var game = new Phaser.Game(1440, 765, Phaser.AUTO, '', { preload: preload, create: create, update: update });

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
    space = game.add.tileSprite(0, 0, 1440, 765, 'space2');
    stars1 = game.add.tileSprite(0, 0, 1440, 765, 'stars1')
    stars1Flipped = game.add.tileSprite(0, 0, 1440, 765, 'stars1Flipped')
        // The ship and its settings
    var ship = game.add.sprite(0, 330, 'ship1');
    ship.scale.setTo(.5, .5)

    //  We need to enable physics on the ship
    game.physics.arcade.enable(ship);

}

function update() {
    space.tilePosition.x -= 0.6;
    stars1.tilePosition.x -= 0.75;
    stars1Flipped.tilePosition.x -= 0.75;

    // //  Collide the player and the stars with the platforms
    // var hitPlatform = game.physics.arcade.collide(player, platforms);
    // game.physics.arcade.collide(stars, platforms);

    // //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // game.physics.arcade.overlap(player, stars, collectStar, null, this);

    // //  Reset the players velocity (movement)
    // player.body.velocity.x = 0;

    // if (cursors.left.isDown)
    // {
    //     //  Move to the left
    //     ship.body.velocity.x = -150;
    //     ship.animations.play('left');
    // }
    // else if (cursors.right.isDown)
    // {
    //     //  Move to the right
    //     ship.body.velocity.x = 150;

    //     ship.animations.play('right');
    // }
    // else
    // {
    //     //  Stand still
    //     ship.animations.stop();

    //     ship.frame = 4;
    // }
    
    // //  Allow the ship to jump if they are touching the ground.
    // if (cursors.up.isDown && ship.body.touching.down && hitPlatform)
    // {
    //     ship.body.velocity.y = -600;
    // }

}