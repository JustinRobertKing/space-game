var loadState = {
	preload: function() {
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
	},
	create: function() {
		game.state.start('menu')
	}
}