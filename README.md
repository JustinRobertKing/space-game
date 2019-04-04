# space-game

Space shooting game project for SEI-24 at General Assembly

## Getting Started

For this project, I wanted to challenge myself to learn how to use Phaser.io. The first several hours spent were solely devoted to doing Phaser tutorials and sifting through documentation to get my bearings. 

Once I felt that I had a decent handle on how to attack a project in Phaser, it was time to start planning. I wanted to be able to knock out a fairly minimal "minimum viable product" so that I could have plenty of time to dig into my stretch goals without stressing too much. With that in mind, I created this list of "must-completes":

	MVP:
		- create game world
		- add background
		- add ship
		- make ship movable
		- add enemies
		- make 3 total enemies
		- program enemy movements
		- create collision detection between enemies and your ship
		- die if you hit an enemy
		- have running score
		- end score when you die
		- display score to user
		- randomly spawn enemy locations

In short, I just needed a ship that could crash into enemies and keep score over time.

I then sat down and listed out the actually functionality that I was hoping to get implemented:

	Stretch
		- create parallax stars background
		- ship can shoot
		- shoot the enemies
			- small takes x hits
			- med takes y hits
			- large takes z hits
		- enemies can shoot
		- change enemy trajectories and velocities
		- use spritesheets to animate shots
		- play music
			- use the Djenerator!!
		- play sounds for shots
		- play sounds for hits / deaths
		- play game over sound
		- dead enemies can drop weapon upgrades
		- change weapons / upgraded ship images
			- if just the ship upgrade is hit, you lose the upgrade
		- can’t shoot after you die
		- high score list
		- permanent high score list
		- landing screen
		- game over screen
		- 2 player mode

## Getting to work

One of my goals for this game, which doesn't really fit into either of the previous catagories, was to make it as immersive as possible. I wanted to take up the full screen and make most of manipulations within the game itself, rather than outside of the game board in DOM elements. Essentially, I had to use the Phaser equivalent of DOM manipulation. 

With this in mind from the beginning, I started by making a full screen game in Phaser. I was able to knock out my MVP in relatively short order and had a full 3 days to start tackling my stretch goals. Underpromise; overdeliver. 

## Stretching my game

Now it was time for the fun part. Deep space, pew pews and boom booms incoming. 

I really wanted to give the background a feeling of depth. I was able to fine several star png files that I then overlayed and had them move and slightly different speeds. This really helped add to the immersive nature of the game that I was shooting for. 

The next step was to make all the projectiles start from a relative position to the ship that shot it. this was actually far simpler than I expected. All that needed to be done was to create an instance of the projectile group and spawn it relative to the absolute location of the ship via it's current x and y. Each weapon then got a time delay to account for the rate of fire. 

I then added collision detections to trigger functions that would either kill the ship or damage the enemies. This was pretty straight forward and didn't take too much time.

One thing that did take quite a while to figure out is how to get my ship upgrade attatchment to append to the y-axis of the ship. We eventually figured out that it needed to be implemented as a child sprite of the ship itself, not as it's own individual sprite. 

A large amount of my time was actually spent finding spritesheets and sounds for my projectiles and effects. This was time well spent. I am really happy with the whole look and feel of the final project. 

The final piece of implementation was adding a high scores list with local storage. This was the only piece of the game that I couldn't get to be fully immersive. If I had more time, I would like to create a text input field within the game itself, not through a pop-up system. 

## Known bugs

none at the moment

## Further goals

I managed to hit all of my stretch goals except 2:

- 2 player mode
- "stackable" weapon upgrades (they get stronger if you get multiple of the same one)

## Technologies used

- Phaser.io 2.2.2
- JavaScript
- HTML5
- CSS
- SweetAlert

## Acknowledgments

- Sprites are from:
	- MillionthVector
	- opengameart.org

- Sounds are from:
	- DL Sounds
	- freesounds.org

- Background images are from:
	- PNG Tree
	- Daniel Ghersi Mendoza