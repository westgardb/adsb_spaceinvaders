let invaders = [];
let torpedos = [];
let lasers = [];
let player;
let points;

let currentGameState;

let exoFont;
let bgImage;
let playerImage;
let invaderImage

function setup() {
	createCanvas(500,500);
	player = new Starship();
	points = 0;

	currentGameState = "runStartMenu";
	
	// load assets into memory
	bgImage = loadImage("assets/spacebg2.jpg");
	playerImage = loadImage("assets/spaceship2.png");
	invaderImage = loadImage("assets/saucer1.png");

	exoFont = loadFont('assets/Exo2-BlackItalic.ttf');
	textFont(exoFont);
	textSize(20);

	nextWave();
}

function draw() {
	switch(currentGameState) {
		case "runGame":
			runGame();
			break;
		case "runLoseMenu":
			runLoseMenu();
			break;
		case "runStartMenu":
			runStartMenu();
			break;
	}
} 

function runGame() {
	background(bgImage);

	stroke(255,255,255);
	fill(255,255,255);
	strokeWeight(0);
	text(`Score: ${points}`, 10,480);

	player.display();

	for (let i = 0; i < invaders.length; i++) {
		invaders[i].display();
		invaders[i].update();
	}

	for (let i = 0; i < lasers.length; i++) {
		lasers[i].display();
		lasers[i].update();
	}

	for (let i = 0; i < torpedos.length; i++) {
		torpedos[i].display();
		torpedos[i].update();
	}

	player.detectInput();
	player.update();
}

function runStartMenu() {
	background(bgImage);
	
	stroke(255,255,255);
	fill(255,255,255);
	strokeWeight(0);
	
	textSize(40);
	text("Space Invaders", 100, 200);

	textSize(20);
	text("Press Space to Play", 150, 300);

	if(keyIsDown(32)) {
		currentGameState = "runGame";
		points = 0;
		invaders = [];
		torpedos = [];
		lasers = [];
		player = new Starship();
		nextWave();
	}
}

function runLoseMenu() {
	background(0,0,0);
	
	stroke(255,255,255);
	fill(255,255,255);
	strokeWeight(0);
	text(`Score: ${points}`, 200,250);
	text("Game Over :(", 200, 200);

	text("Press Space to Try Again", 200, 300);

	if(keyIsDown(32)) {
		currentGameState = "runGame";
		points = 0;
		invaders = [];
		torpedos = [];
		lasers = [];
		player = new Starship();
		nextWave();
	}
}

function nextWave() {
	invaders = [];

	for (let i = 0; i < 8; i++) {
		invaders.push(new Invader((50*i) + 50, -20));
	}
}