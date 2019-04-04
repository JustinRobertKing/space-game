var menuState = {
	create: function() {
		space = game.add.tileSprite(0, 0, 1440, 765, 'space2');
    	stars1 = game.add.tileSprite(0, 0, 1440, 765, 'stars1');
    	stars1Flipped = game.add.tileSprite(0, 0, 1440, 765, 'stars1Flipped');
		var startText = game.add.text(game.world.centerX, game.world.centerY, "PRESS \"SPACE\"", { font: '100px Arial' , fill: 'hotpink' });
    	startText.anchor.setTo(.5);
    	startText.setShadow(5, 5, 'rgba(0,0,0,.7)', 5);


    	var spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	spaceBar.onDown.addOnce(this.start, this)

	},
	update: function() {
		space.tilePosition.x -= 0.6;
	    stars1.tilePosition.x -= 0.75;
	    stars1Flipped.tilePosition.x -= 0.75;
	},
	start: function() {
		game.state.start('play')
	},
};