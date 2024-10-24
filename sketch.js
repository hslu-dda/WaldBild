var socket;

let data = [];
let systems = [];

let yScalePlant = d3.scalePoint();
let yScaleFungi = d3.scalePoint();
let vScaleConnection = d3.scaleSqrt();
let cScale = d3.scaleOrdinal();
let colScale = d3.scaleSequential();

let v1;
let v2;

let xFungi;
let yFungi;
let imageArray;
let currentImage = 0;

let debugView = false;
let mask;
let corners = [
  {
    x: 174,
    y: 25,
  },
  {
    x: 1774,
    y: 28,
  },
  {
    x: 1796,
    y: 1074,
  },
  {
    x: 140,
    y: 1072,
  },
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  updateMask();

  //socket = socket.io.connect('http://localhost:3000');
  socket = io.connect("https://dda-miflck.herokuapp.com/");

  // Callback function
  socket.on("message", (data) => {
    console.log("callback from server", data);
    switch (data) {
      case 0:
        background(4, 47, 16);
        currentImage = 0;
        break;
    }
    switch (data) {
      case 1:
        background(4, 47, 16);
        currentImage = 1;
        break;
    }
    switch (data) {
      case 2:
        background(4, 47, 16);
        currentImage = 2;
        break;
    }
    switch (data) {
      case 3:
        background(4, 47, 16);
        currentImage = 3;
        break;
    }
    switch (data) {
      case 4:
        background(4, 47, 16);
        currentImage = 4;
        break;
    }
    switch (data) {
      case 5:
        background(4, 47, 16);
        currentImage = 5;
        break;
    }
    switch (data) {
      case 6:
        background(4, 47, 16);
        currentImage = 6;
        break;
    }
    switch (data) {
      case 7:
        background(4, 47, 16);
        currentImage = 7;
        break;
    }
    switch (data) {
      case 8:
        background(4, 47, 16);
        currentImage = 8;
        break;
    }
  });

  // gets called when new client arrives
  socket.on("client connected", (data) => {
    console.log("client added", data);
  });

  wald = loadImage("M/WaldBild.png");
  m1 = loadImage("M/M1.png");
  m2 = loadImage("M/M2.png");
  m3 = loadImage("M/M3.png");
  m4 = loadImage("M/M4.png");
  m5 = loadImage("M/M5.png");
  m6 = loadImage("M/M6.png");
  m7 = loadImage("M/M7.png");
  m8 = loadImage("M/M8.png");

  imageArray = [wald, m1, m2, m3, m4, m5, m6, m7, m8];
}

function draw() {
  background(0);

  image(
    imageArray[currentImage],
    0,
    0,
    width,
    (imageArray[currentImage].height * width) / imageArray[currentImage].width
  );

  // Apply the mask
  image(mask, 0, 0);

  if (debugView) {
    // Draw the corners for reference
    fill(0, 255, 0);
    for (let i = 0; i < corners.length; i++) {
      ellipse(corners[i].x, corners[i].y, 10, 10);
      text(i + 1, corners[i].x + 15, corners[i].y + 15);
    }
  }
}

function keyPressed() {
  if (key >= "1" && key <= "4") {
    let index = int(key) - 1;
    corners[index] = { x: mouseX, y: mouseY };
    updateMask();
  }
  if (key == "d") {
    debugView = false;
  }
  if (key == "D") {
    debugView = true;
  }
  if (key == "s") {
    saveJSON(corners, "corners_WaldBild.json");

    //saveCanvas("fungi", "png");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function updateMask() {
  mask = createGraphics(width, height);
  mask.fill(0);
  mask.rect(0, 0, width, height);
  mask.erase();
  mask.beginShape();
  for (let corner of corners) {
    mask.vertex(corner.x, corner.y);
  }
  mask.endShape(CLOSE);
  mask.noErase();
}
