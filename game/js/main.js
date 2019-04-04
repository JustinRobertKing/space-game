var game = new Phaser.Game(1440, 765, Phaser.AUTO, '', { preload: preload, create: create, update: update});

var space;
var cursors;
var ship;
var ship2s;
var ship3s;
var ship4s;
var aura;
var explosion;
var upgrade;
var bluePlasma;
var orbs;
var orbsReset = 0;
var enemyBluePlasma;
var bluePlasmaReset = 0;
var gun2s;
var gun2sReset = 0
var gun3s;
var gun3sReset = 0;
var gun4s;
var gun4sReset = 0
var enemyBluePlasmaReset = 0;
var currentWeapon = "plasma"
var score = 0;
var scoreText; 
var yourScoreText
var scorePoints;
var alienSpaceShips;
var alienMediumShips;
var alienCannons;
var shipUpgrade;
var smallSpawnTimer;
var mediumSpawnTimer;
var cannonSpawnTimer;
var smallInterval = .7;
var mediumInterval = 3.8;
var cannonInterval = 12;
var increaseWave;
var wave = 1;
var waveText
var music;
var comet;
var cometReset = 0
// Initial health bars
var alienSpaceShipsHealth = 300;
var alienMediumShipsHealth = 700;
var alienCannonsHealth = 1500;
var shipAlive = true;

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
    game.load.spritesheet('gun2', 'img/sparkling-fireball-wind.png', 256, 256)
    game.load.spritesheet('gun3', 'img/lasers.png', 512, 128)
    game.load.spritesheet('gun4', 'img/sparkling-fireball-small-wind.png', 256, 256)
    // Load effects images
    game.load.spritesheet('aura', 'img/Aura38.png', 128, 128)
    game.load.spritesheet('explosion', 'img/Explosion03.png', 128, 128)
    // Load upgrade image
    game.load.image('upgrade', 'img/spacestation.png')
    // Load audio
    game.load.audio('music', 'audio/Sci-fiPulseLoop.wav')
    game.load.audio('comet', 'audio/Grenade4.mp3')
    game.load.audio('photon', 'audio/Photon.wav')
    game.load.audio('laser', 'audio/laser.mp3')
    game.load.audio('hose', 'audio/hoseloop.mp3')
    game.load.audio('powerup', 'audio/powerup.mp3')
    game.load.audio('flame', 'audio/flame.wav')
    game.load.audio('end', 'audio/gameover.wav')
    game.load.audio('hit', 'audio/hit.wav')
    game.load.audio('disc', 'audio/orb.wav')
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
    alienSpaceShips = addGroup(200, "alienSpaceShip");
    alienMediumShips = addGroup(50, "alienMediumShip")
    alienCannons = addGroup(30, "alienCannon")
    // Create player projectiles
    bluePlasma = addGroup(200, 'bluePlasma')
    gun2s = addGroup(200, 'gun2')
    gun3s = addGroup(30, 'gun3')
    gun4s = addGroup(600, 'gun4')
    enemyBluePlasma = addGroup(400, "bluePlasma")
    orbs = addGroup(200, "orbs")
    // Create effects
    // aura = addGroup(500, "aura")
    explosion = addGroup(1000, "explosion")
    explosion.forEach(dmg => {
        var anim = dmg.animations.add('dmg', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16], 45, false);
        anim.onComplete.add((sprite) => {
            sprite.kill()
        })
    })
    
    // Create powerups
    upgrade = addGroup(5, "upgrade")
    ship2s = addGroup(200, "ship2")
    ship3s = addGroup(200, "ship3")
    ship4s = addGroup(200, "ship4")

    // Add music & sounds
    music = new Phaser.Sound(game, "music", 1, true)
    comet = game.add.audio("comet", .5, false)
    photon = game.add.audio("photon", .2, false)
    flame = game.add.audio('flame', 2, false)
    laser = game.add.audio("laser", .3, false)
    hose = game.add.audio("hose", .1, false)
    powerUp = game.add.audio("powerup", .6, false)
    end = game.add.audio('end', .5, false)
    hit = game.add.audio('hit', .1, false)
    disc = game.add.audio('disc', .65, false)

    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);

    scoreText = game.add.text(game.width - 200, 16, 'Score: 0', { fontSize: '32px', fill: 'hotpink' });
    yourScoreText = game.add.text(game.world.centerX, game.world.centerY, "", { font: '300px Arial' , fill: 'hotpink' });
    yourScoreText.anchor.setTo(.5);

    scorePoints = game.time.events.loop(Phaser.Timer.SECOND * .1, scorePoints, this);
    smallSpawnTimer = game.time.events.loop(Phaser.Timer.SECOND * smallInterval, spawnSmallEnemies, this)
    mediumSpawnTimer = game.time.events.loop(Phaser.Timer.SECOND * mediumInterval, spawnMediumEnemies, this)
    cannonSpawnTimer = game.time.events.loop(Phaser.Timer.SECOND * cannonInterval, spawnCannonEnemies, this)
    increaseWave = game.time.events.loop(Phaser.Timer.MINUTE * .25, updateTimers, this)
}

function updateTimers() {
    if (smallInterval <= .05) {
        return;
    }
    game.time.events.remove(smallSpawnTimer)
    game.time.events.remove(mediumSpawnTimer)
    game.time.events.remove(cannonSpawnTimer)
    smallInterval -= .05
    mediumSpawnTimer -= .2
    cannonSpawnTimer -= .75
    smallSpawnTimer = game.time.events.loop(Phaser.Timer.SECOND * smallInterval, spawnSmallEnemies, this)
    mediumSpawnTimer = game.time.events.loop(Phaser.Timer.SECOND * mediumInterval, spawnMediumEnemies, this)
    cannonSpawnTimer = game.time.events.loop(Phaser.Timer.SECOND * cannonInterval, spawnCannonEnemies, this)
}

function update() {
    space.tilePosition.x -= 0.6;
    stars1.tilePosition.x -= 0.75;
    stars1Flipped.tilePosition.x -= 0.75;

    // Rotate powerups
    upgrade.forEachAlive(pUp => pUp.angle += 2)
    // Medium ships fire weapons
    alienMediumShips.forEachAlive(function(alienMediumShip) {
        fireOrbs(alienMediumShip);
    })
    // Fire cannons when cannons reach a certain x point
    alienCannons.forEachAlive(function(alienCannon) {
        if (alienCannon.x <= 1300) {
            fireCannon(alienCannon)
        }
    })
    // Check for collision deaths
    game.physics.arcade.overlap(ship, alienSpaceShips, gameOver, null, this);
    game.physics.arcade.overlap(ship, alienMediumShips, gameOver, null, this);
    game.physics.arcade.overlap(ship, alienCannons, gameOver, null, this);
    game.physics.arcade.overlap(ship, enemyBluePlasma, gameOver, null, this);
    game.physics.arcade.overlap(ship, orbs, gameOver, null, this);
    // Check for upgraded ship parts collisions
    game.physics.arcade.overlap(ship2s, alienSpaceShips, downGradeShip, null, this);
    game.physics.arcade.overlap(ship2s, alienMediumShips, downGradeShip, null, this);
    game.physics.arcade.overlap(ship2s, alienCannons, downGradeShip, null, this);
    game.physics.arcade.overlap(ship2s, enemyBluePlasma, downGradeShip, null, this);
    game.physics.arcade.overlap(ship2s, orbs, downGradeShip, null, this);
    
    game.physics.arcade.overlap(ship3s, alienSpaceShips, downGradeShip, null, this);
    game.physics.arcade.overlap(ship3s, alienMediumShips, downGradeShip, null, this);
    game.physics.arcade.overlap(ship3s, alienCannons, downGradeShip, null, this);
    game.physics.arcade.overlap(ship3s, enemyBluePlasma, downGradeShip, null, this);
    game.physics.arcade.overlap(ship3s, orbs, downGradeShip, null, this);
    
    game.physics.arcade.overlap(ship4s, alienSpaceShips, downGradeShip, null, this);
    game.physics.arcade.overlap(ship4s, alienMediumShips, downGradeShip, null, this);
    game.physics.arcade.overlap(ship4s, alienCannons, downGradeShip, null, this);
    game.physics.arcade.overlap(ship4s, enemyBluePlasma, downGradeShip, null, this);
    game.physics.arcade.overlap(ship4s, orbs, downGradeShip, null, this);


    // Check for weapon hits
    game.physics.arcade.overlap(bluePlasma, alienSpaceShips, damageSmallShips, null, this);
    game.physics.arcade.overlap(bluePlasma, alienMediumShips, damageMediumShips, null, this);
    game.physics.arcade.overlap(bluePlasma, alienCannons, damageCannons, null, this);

    game.physics.arcade.overlap(gun2s, alienSpaceShips, damageSmallShips, null, this);
    game.physics.arcade.overlap(gun2s, alienMediumShips, damageMediumShips, null, this);
    game.physics.arcade.overlap(gun2s, alienCannons, damageCannons, null, this);

    game.physics.arcade.overlap(gun3s, alienSpaceShips, damageSmallShips, null, this);
    game.physics.arcade.overlap(gun3s, alienMediumShips, damageMediumShips, null, this);
    game.physics.arcade.overlap(gun3s, alienCannons, damageCannons, null, this);

    game.physics.arcade.overlap(gun4s, alienSpaceShips, damageSmallShips, null, this);
    game.physics.arcade.overlap(gun4s, alienMediumShips, damageMediumShips, null, this);
    game.physics.arcade.overlap(gun4s, alienCannons, damageCannons, null, this);

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

function fireCannon(alienCannon) {
    if (game.time.now < enemyBluePlasmaReset) {
        return;
    }
    if (game.time.now > cometReset) {
        comet.play()
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
    cometReset = game.time.now + 2000
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
    disc.play()
}

function shootWeapon() {
    if (!shipAlive) {
        return;
    }
    if (currentWeapon === "plasma") {
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
        photon.play()
    } else if (currentWeapon === "gun2") {
        var gun2 = gun2s.getFirstExists(false)
        if (game.time.now < gun2sReset) {
            return;
        }
        gun2.reset(ship.x + 60, ship.y)
        gun2.angle = -90
        gun2.scale.setTo(.6, .6)
        gun2.animations.add('shoot', 
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
            11, 12, 13, 14, 15, 16, 17, 18, 19, 
            20, 21, ,22, 23, 24, 25, 26, 27, 28, 29, 
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
            41, 42, 43, 44, 45, 46,], 
            20, true);
        gun2.animations.play('shoot')
        gun2.anchor.setTo(.5)
        gun2.body.setSize(5, 5, 0, 0)
        gun2.body.velocity.x = 1000
        gun2.body.velocity.y = (.5 - Math.random()) * 200
        gun2sReset = game.time.now + 150
        flame.play()
    } else if (currentWeapon === "gun3") {
        var gun3 = gun3s.getFirstExists(false)
        if (game.time.now < gun3sReset) {
            return;
        }
        gun3.reset(ship.x + 120, ship.y)
        // gun3.angle = -90
        gun3.scale.setTo(.3, .3 )
        gun3.animations.add('shoot', 
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 
            60, true);
        gun3.animations.play('shoot')
        gun3.anchor.setTo(.5)
        gun3.body.setSize(5, 5, 0, 0)
        gun3.body.velocity.x = 1500
        gun3sReset = game.time.now + 500
        laser.play()
    } else if (currentWeapon === "gun4") {
        var gun4 = gun4s.getFirstExists(false)
        if (game.time.now < gun4sReset) {
            return;
        }
        gun4.reset(ship.x + 80, ship.y)
        gun4.angle = -90
        gun4.scale.setTo(.3, .3)
        gun4.animations.add('shoot', 
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
            11, 12, 13, 14, 15, 16, 17, 18, 19, 
            20, 21, ,22, 23, 24, 25, 26, 27, 28, 29, 
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46], 
            20, true);
        gun4.animations.play('shoot')
        gun4.anchor.setTo(.5)
        gun4.body.setSize(5, 5, 0, 0)
        gun4.body.velocity.x = 600
        gun4sReset = game.time.now + 10
        hose.play()
    }
} 

function damageSmallShips(projectile, alienSpaceShip) {
    var dmg = explosion.getFirstExists(false);
    dmg.reset(alienSpaceShip.x, alienSpaceShip.y);
    dmg.scale.setTo(.75, .75)
    dmg.animations.play('dmg');
    dmg.anchor.setTo(.5);
    if (currentWeapon != "gun4") {
        projectile.kill();
    }
    if (currentWeapon === "plasma") {
        alienSpaceShip.life -= 100
    } else if (currentWeapon === "gun2") {
        alienSpaceShip.life -= 150
    } else if (currentWeapon === "gun3") {
        alienSpaceShip.life -= 600
    } else if (currentWeapon === "gun4") {
        alienSpaceShip.life -= 7
    }
    if (alienSpaceShip.life <= 0) {
        score += 100
        alienSpaceShip.kill();
    }
    hit.play()
} 

function damageMediumShips(projectile, alienMediumShip) {
    var dmg = explosion.getFirstExists(false);
    dmg.reset(projectile.x + 40, projectile.y);
    dmg.scale.setTo(.75, .75)
    dmg.animations.play('dmg');
    dmg.anchor.setTo(.5);
    projectile.kill();
    if (currentWeapon === "plasma") {
        alienMediumShip.life -= 100
    } else if (currentWeapon === "gun2"){
        alienMediumShip.life -= 150
    } else if (currentWeapon === "gun3") {
        alienMediumShip.life -= 600
    } else if (currentWeapon === "gun4") {
        alienMediumShip.life -= 7
    }
    if (alienMediumShip.life <= 0) {
        dmg.reset(alienMediumShip.x, alienMediumShip.y);
        dmg.scale.set(1.5, 1.5);
        dmg.animations.play('dmg');
        score += 1000;
        dropPowerUp(alienMediumShip);
        alienMediumShip.kill();
    } 
    hit.play()
}

function damageCannons(projectile, alienCannon) {
    var dmg = explosion.getFirstExists(false);
    dmg.reset(projectile.x + 60, projectile.y);
    dmg.scale.setTo(.75, .75)
    dmg.animations.play('dmg');
    dmg.anchor.setTo(.5);
    projectile.kill();
    if (currentWeapon === "plasma") {
        alienCannon.life -= 100
    } else if (currentWeapon === "gun2"){
        alienCannon.life -= 150
    } else if (currentWeapon === "gun3") {
        alienCannon.life -= 600
    } else if (currentWeapon === "gun4") {
        alienCannon.life -= 7
    }
    if (alienCannon.life <= 0) {
        dmg.reset(alienCannon.x, alienCannon.y)
        dmg.scale.set(2.2, 2.2)
        dmg.animations.play('dmg')
        score += 5000
        alienCannon.kill();
    }
    hit.play()
}

function gameOver(ship, enemy) {
    var dmg = explosion.getFirstExists(false);
    dmg.reset(ship.x, ship.y);
    dmg.scale.setTo(2, 2)
    dmg.animations.play('dmg');
    dmg.anchor.setTo(.5);
    ship.kill();
    game.time.events.remove(scorePoints);
    scoreText.text = "";
    yourScoreText.text = score;
    end.play()
    shipAlive = false
} 

function dropPowerUp(alienMediumShip) {
    var chance = Math.ceil(Math.random() * 2)
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
    console.log('num children', ship.children.length)
    if(shipUpgrade){
        shipUpgrade.kill()
    //     // ship2s.addChild(shipUpgrade)
    //     ship3s.addChild(shipUpgrade)
    //     // ship4s.addChild(shipUpgrade)
    }
    var chance = Math.ceil(Math.random() * 3)
    let offset = 120
    if (chance === 1) {
        currentWeapon = "gun2"
        shipUpgrade = ship2s.getFirstExists(false);
    } else if (chance === 2) {
        currentWeapon = "gun3"
        shipUpgrade = ship3s.getFirstExists(false);
        offset = 140
    } else if (chance === 3) {
        currentWeapon = "gun4"
        shipUpgrade = ship4s.getFirstExists(false);
    }
    shipUpgrade.anchor.setTo(.5);
    shipUpgrade.body.setSize(20, 20, 0, 0)
    ship.addChild(shipUpgrade)
    shipUpgrade.reset(offset, 0);
    score += 2000;
    powerUp.play()
}

function downGradeShip(shipPart, projectile) {
    shipPart.kill()
    projectile.kill()
    currentWeapon = "plasma"
}