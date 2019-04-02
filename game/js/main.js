console.log('fuck you')

var game = new Phaser.Game(1440, 765, Phaser.AUTO, '', { preload: preload, create: create, update: update});

var space;
var cursors;
var ship;
var aura;
var explosion;
var upgrade;
var bluePlasma;
var orbs;
var orbsReset = 0;
var enemyBluePlasma;
var bluePlasmaReset = 0;
var enemyBluePlasmaReset = 0;
var score = 0;
var scoreText; 
var yourScoreText
var scorePoints;
var alienSpaceShips;
var alienMediumShips;
var alienCannons;
// Initial health bars
var alienSpaceShipsHealth = 300;
var alienMediumShipsHealth = 700;
var alienCannonsHealth = 1500;

function addGroup(amount, sprite) {
    var newThing = game.add.group();
    newThing.physicsBodyType = Phaser.Physics.ARCADE;
    newThing.enableBody = true;
    newThing.createMultiple(amount, sprite);
    newThing.setAll("outOfBoundsKill", true);
    newThing.setAll("checkWorldBounds", true);
    return newThing;
}

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
    game.load.spritesheet('orbs', 'img/Effect95.png', 128, 128)
    // Load effects images
    game.load.spritesheet('aura', 'img/Aura38.png', 128, 128)
    game.load.spritesheet('explosion', 'img/Explosion03.png', 128, 128)
    // Load upgrade image
    game.load.image('upgrade', 'img/spacestation.png')
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
    alienSpaceShips = addGroup(500, "alienSpaceShip");
    alienMediumShips = addGroup(500, "alienMediumShip")
    alienCannons = addGroup(500, "alienCannon")
    // Create projectiles
    bluePlasma = addGroup(100, 'bluePlasma')
    enemyBluePlasma = addGroup(500, "bluePlasma")
    orbs = addGroup(100, "orbs")
    // Create effects
    aura = addGroup(500, "aura")
    explosion = addGroup(500, "explosion")
    // Create powerups
    upgrade = addGroup(50, "upgrade")
    ship2s = addGroup(10, "ship2")

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

    // Rotate powerups
    upgrade.forEachAlive(pUp => pUp.angle += 2)
    // Attach ship upgrades
    ship2s.forEachAlive(function(ship2) {
        ship2.body.velocity.x = 0;
        ship2.body.velocity.y = 0;
        if(cursors.left.isDown) {
        ship2.body.velocity.x = -300;
        } else if(cursors.right.isDown) {
            ship2.body.velocity.x = 300;
        } if (cursors.up.isDown) {
            ship2.body.velocity.y = -300;
        } else if (cursors.down.isDown) {
            ship2.body.velocity.y = 300;
        }
    })
    // Medium ships fire weapons
    alienMediumShips.forEachAlive(function(alienMediumShip) {
        fireOrbs(alienMediumShip);
    })
    // Fire lasers when cannons reach a certain x point
    alienCannons.forEachAlive(function(alienCannon) {
        if (alienCannon.x <= 1300) {
            fireLaser(alienCannon)
        }
    })
    // Check for collision deaths
    game.physics.arcade.overlap(ship, alienSpaceShips, gameOver, null, this);
    game.physics.arcade.overlap(ship, alienMediumShips, gameOver, null, this);
    game.physics.arcade.overlap(ship, alienCannons, gameOver, null, this);
    game.physics.arcade.overlap(ship, enemyBluePlasma, gameOver, null, this);
    game.physics.arcade.overlap(ship, orbs, gameOver, null, this);

    // Check for weapon hits
    game.physics.arcade.overlap(bluePlasma, alienSpaceShips, damageSmallShips, null, this);
    game.physics.arcade.overlap(bluePlasma, alienMediumShips, damageMediumShips, null, this);
    game.physics.arcade.overlap(bluePlasma, alienCannons, damageCannons, null, this);

    // Check for upgrade collisions
    game.physics.arcade.overlap(ship, upgrade, collectPowerUp, null, this);
 
    // Stop the ship from moving
    ship.body.velocity.x = 0
    ship.body.velocity.y = 0

   if(cursors.left.isDown) {
        ship.body.velocity.x = -300;
    } else if(cursors.right.isDown) {
        ship.body.velocity.x = 300;
    } if (cursors.up.isDown) {
        ship.body.velocity.y = -300;
    } else if (cursors.down.isDown) {
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
    alienSpaceShip.reset(game.width + alienSpaceShip.width, game.rnd.frac() * 700);
    alienSpaceShip.scale.setTo(.2, .2);
    alienSpaceShip.anchor.setTo(.5)
    alienSpaceShip.life = alienSpaceShipsHealth
    alienSpaceShip.body.velocity.x = -300
    alienSpaceShip.body.velocity.y = (.5 - Math.random()) * 100 
    // var trail = aura.getFirstExists(false)
    // trail.reset(alienSpaceShip.x + 30, alienSpaceShip.y)
    // trail.angle = +90
    // trail.scale.setTo(.3, .3)
    // trail.animations.add('trail', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
    //     11, 12, 13, 14, 15, 16, 17, 18, 19, 
    //     20, 21, ,22, 23, 24, 25, 26, 27, 28, 29, 
    //     30, 31, 32], 60, true);
    // trail.animations.play('trail')
    // trail.anchor.setTo(.5)
    // trail.body.velocity.x = -300
    // trail.body.velocity.y = alienSpaceShip.body.velocity.y
}

function spawnMediumEnemies() {
     // Create small enemy ships
    var alienMediumShip = alienMediumShips.getFirstExists(false)
    alienMediumShip.reset(game.width + alienMediumShip.width, game.rnd.frac() * 700);
    alienMediumShip.scale.setTo(.5, .5);
    alienMediumShip.anchor.setTo(.5);
    alienMediumShip.life = alienMediumShipsHealth
    alienMediumShip.body.velocity.x = -500;
    alienMediumShip.body.acceleration.x = 200;
    alienMediumShip.body.velocity.y = (.5 - Math.random()) * 500;
}

function spawnCannonEnemies() {
     // Create small enemy ships
    var alienCannon = alienCannons.getFirstExists(false)
    alienCannon.reset(game.width + alienCannon.width, game.rnd.frac() * 700);
    alienCannon.anchor.setTo(.5)
    alienCannon.life = alienCannonsHealth
    alienCannon.body.velocity.x = -200
    alienCannon.body.acceleration.x = 50
    alienCannon.body.velocity.y = 0
}

function fireLaser(alienCannon) {
    if (game.time.now < enemyBluePlasmaReset) {
        return;
    }
    var enemyBluePls = enemyBluePlasma.getFirstExists(false);
    enemyBluePls.reset(alienCannon.x - 40, alienCannon.y)
    enemyBluePls.angle = +90
    enemyBluePls.anchor.setTo(.5)
    enemyBluePls.scale.setTo(1.5, 1.5)
    enemyBluePls.body.setSize(120, 120, 0, 0)

    enemyBluePls.animations.add('shoot', 
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16, 17, 18, 19, 
        20, 21, ,22, 23, 24, 25, 26, 27, 28, 29, 
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
        41, 42, 43, 44, 45, 46, 47, 48], 
        20, true);
    enemyBluePls.animations.play('shoot')
    enemyBluePls.body.velocity.x = -3000
    enemyBluePlasmaReset = game.time.now + 20
}

function fireOrbs(alienMediumShip) {
    if (game.time.now < orbsReset) {
        return;
    }
    var orb = orbs.getFirstExists(false);
    orb.reset(alienMediumShip.x - 40, alienMediumShip.y)
    orb.anchor.setTo(.5)
    orb.scale.setTo(.3, .3)
    orb.animations.add('shoot', 
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16], 
        10, false);
    orb.animations.play('shoot')
    orb.body.velocity.x = -800
    orbsReset = game.time.now + 800
}

function shootWeapon() {
    var bluePls = bluePlasma.getFirstExists(false)
    if (game.time.now < bluePlasmaReset) {
        return;
    }
    bluePls.reset(ship.x + 30, ship.y)
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
    bluePls.anchor.setTo(.5)
    bluePls.body.setSize(5, 5, 0, 0)
    bluePls.body.velocity.x = 600
    bluePlasmaReset = game.time.now + 200
} 

function damageSmallShips(bluePls, alienSpaceShip) {
    var dmg = explosion.getFirstExists(false);
    dmg.reset(alienSpaceShip.x, alienSpaceShip.y);
    dmg.scale.setTo(.75, .75)
    dmg.animations.add('dmg', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16], 45, false);
    dmg.animations.play('dmg');
    dmg.anchor.setTo(.5);
    bluePls.kill();
    alienSpaceShip.life -= 100
    if (alienSpaceShip.life <= 0) {
        score += 100
        alienSpaceShip.kill();
    }
} 

function damageMediumShips(bluePls, alienMediumShip) {
    var dmg = explosion.getFirstExists(false);
    dmg.reset(bluePls.x + 40, bluePls.y);
    dmg.scale.setTo(.75, .75)
    dmg.animations.add('dmg', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16], 45, false);
    dmg.animations.play('dmg');
    dmg.anchor.setTo(.5);
    bluePls.kill();
    alienMediumShip.life -= 100
    if (alienMediumShip.life <= 0) {
        dmg.reset(alienMediumShip.x, alienMediumShip.y);
        dmg.scale.set(1.5, 1.5);
        dmg.animations.play('dmg');
        score += 1000;
        dropPowerUp(alienMediumShip);
        alienMediumShip.kill();
    }
}

function damageCannons(bluePls, alienCannon) {
    var dmg = explosion.getFirstExists(false);
    dmg.reset(bluePls.x + 60, bluePls.y);
    dmg.scale.setTo(.75, .75)
    dmg.animations.add('dmg', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16], 45, false);
    dmg.animations.play('dmg');
    dmg.anchor.setTo(.5);
    bluePls.kill()
    alienCannon.life -= 100
    if (alienCannon.life <= 0) {
        dmg.reset(alienCannon.x, alienCannon.y)
        dmg.scale.set(2.2, 2.2)
        dmg.animations.play('dmg')
        score += 10000
        alienCannon.kill();
    }
}

function gameOver(ship, enemy) {
    var dmg = explosion.getFirstExists(false);
    dmg.reset(ship.x, ship.y);
    dmg.scale.setTo(2, 2)
    dmg.animations.add('dmg', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16], 45, false);
    dmg.animations.play('dmg');
    dmg.anchor.setTo(.5);
    ship.kill();
    game.time.events.remove(scorePoints);
    scoreText.text = "";
    yourScoreText.text = score;
} 

function dropPowerUp(alienMediumShip) {
    var chance = Math.ceil(Math.random() * 3)
    if (chance === 1) {
        var pUp = upgrade.getFirstExists(false);
        pUp.reset(alienMediumShip.x, alienMediumShip.y);
        pUp.scale.setTo(.75, .75);
        pUp.anchor.setTo(.5);
        pUp.body.velocity.x = -150
        pUp.body.velocity.y = (.5 - Math.random()) * 100
    }
}

function collectPowerUp(ship, upgrade) {
    upgrade.kill()
    var ship2 = ship2s.getFirstExists(false);
    ship2.scale.setTo(.4, .4);
    ship2.reset(ship.x + 50, ship.y);
    ship2.anchor.setTo(.5);
}