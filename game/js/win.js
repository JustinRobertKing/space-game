var winState = {
	create: function() {
		space = game.add.tileSprite(0, 0, 1440, 765, 'space2');
	    stars1 = game.add.tileSprite(0, 0, 1440, 765, 'stars1');
	    stars1Flipped = game.add.tileSprite(0, 0, 1440, 765, 'stars1Flipped');

		highScores = game.add.text(game.world.centerX, 100, "HIGH SCORES:", { font: '80px Arial' , fill: 'hotpink' });
	    highScores.anchor.setTo(.5);
	    highScores.setShadow(5, 5, 'rgba(0,0,0,.7)', 5);

    	highScoreList = game.add.text(game.world.centerX, game.world.centerY, "", { font: '60px Courier' , fill: 'hotpink' });	  
	    highScoreList.anchor.setTo(.5);
	    highScoreList.setShadow(5, 5, 'rgba(0,0,0,.7)', 5);

	    // restartText = game.add.text(game.world.centerX, 700, "PRESS \"SPACE\" TO TRY AGAIN", { font: '40px Arial' , fill: 'hotpink' });	  
	    // restartText.anchor.setTo(.5);
	    // restartText.setShadow(5, 5, 'rgba(0,0,0,.7)', 5);


	    function displayHighScores() {
	    	var scores = getHighScores();
		    for(var i = 0; i < scores.length; i++) {
		    	var entry = scores[i].name + ": " + scores[i].score;
				highScoreList.text = highScoreList.text + "\n" + entry;
		    }
		}
		var spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	spaceBar.onDown.addOnce(this.restart, this)

		displayHighScores()
	},
	update: function() {
		space.tilePosition.x -= 0.6;
	    stars1.tilePosition.x -= 0.75;
	    stars1Flipped.tilePosition.x -= 0.75;
	},
	restart: function() {
		music.pause()
		game.state.start('play')
	},
}