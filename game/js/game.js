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
var comet = null
var cometReset = 0
// Initial health bars
var alienSpaceShipsHealth = 300;
var alienMediumShipsHealth = 700;
var alienCannonsHealth = 1500;
var shipAlive = true;
var endTimer = null

var game = new Phaser.Game(1440, 765, Phaser.AUTO, '');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

game.state.start('boot');
