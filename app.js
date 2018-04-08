var canvas;
var stage;

var key1;
var key2;
var key1Pixelated;
var key2Pixelated;
var key1Text;
var key2Text;
var revealBtn;
var border;
var currentTime;
var running = false;

function init() {
    canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
	stage.enableMouseOver(50);

    initialScreen();

    canvas.onclick = startGame;
}

function initialScreen() {
    var messageField = new createjs.Text("Click to start\n\n\nNote: If your mouse leaves this box,\nyou will automatically lose the game!", "bold 24px Sans-serif", "#FFFFFF");
    messageField.maxWidth = 1000;
    messageField.textAlign = "center";
    messageField.textBaseline = "middle";
    messageField.x = canvas.width / 2;
    messageField.y = canvas.height / 2;

    stage.addChild(messageField);

    stage.update();
}

function startGame() {
    running = true;

    canvas.style.backgroundColor = "#ffffff";

    stage.removeAllChildren();
    stage.clear();

    canvas.onclick = null;

    var img = new createjs.Bitmap("amazon.jpg");

    key1 = new createjs.Bitmap("key1.png");
    key2 = new createjs.Bitmap("Key2.png");
    key1Pixelated = new createjs.Bitmap("key1Pixel.png");
    key2Pixelated = new createjs.Bitmap("Key2Pixel.png");
    key1Text = new createjs.Text("$25 Key 1", "16px Sans-serif");
    key2Text = new createjs.Text("$25 Key 2", "16px Sans-serif");
    revealBtn = new Button("Reveal Now!", "#ff0000", reveal);
    border = new createjs.Shape();
    border.graphics.beginStroke("#000");
    border.graphics.setStrokeStyle(40);
    border.snapToPixel = true;
    border.graphics.drawRect(0, 0, 760, 360);

    img.setTransform(200, 50, 0.8, 0.8);
    key1Pixelated.setTransform(50, 225);
    key2Pixelated.setTransform(525, 225);
    key1Text.setTransform(125, 200);
    key2Text.setTransform(600, 200);
    revealBtn.setTransform(325, 300);
    border.setTransform(20, 20);

    stage.addChild(img);
    stage.addChild(key1Pixelated);
    stage.addChild(key2Pixelated);
    stage.addChild(key1Text);
    stage.addChild(key2Text);
    stage.addChild(border);
    stage.addChild(revealBtn);

    createjs.Tween.get(img, {loop: true})
        .to({x: 400}, 1000, createjs.Ease.getPowInOut(3))
        .to({x: 200}, 1000, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

    border.on("mouseover", reveal);

    stage.update();
}

function reveal() {
    stage.removeChild(key1Pixelated);
    stage.removeChild(revealBtn);
    stage.removeChild(key2Text);
    stage.removeChild(key2Pixelated);

    key1.setTransform(50, 225);
    stage.addChild(key1);

    var text = new createjs.Text("Enjoy your $25!", "16px Sans-serif");
    text.setTransform(350, 325);
    stage.addChild(text);

    stage.update();
}

// function endGame() {
//     currentTime = createjs.Ticker.getTime();
//     while (Math.floor(currentTime / 1000) < 5) {
//         currentTime = createjs.Ticker.getTime();
//     }
//     alert("passed 5 seconds");
//     //
//     // alert("passed 5 seconds");
//     //
//     // stage.removeChild(key1Pixelated);
//     // stage.removeChild(key2Pixelated);
//     // stage.removeChild(revealBtn);
//     //
//     // key1.setTransform(50, 225);
//     // key2.setTransform(525, 225);
//     //
//     // stage.addChild(key1);
//     // stage.addChild(key2);
//     //
//     // stage.update();
// }
