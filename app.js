var canvas;
var stage;

function init() {
    canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);

    initialScreen();

    canvas.onclick = startGame;
}

function initialScreen() {
    messageField = new createjs.Text("Click to start", "bold 24px Sans-serif", "#FFFFFF");
    messageField.maxWidth = 1000;
    messageField.textAlign = "center";
    messageField.textBaseline = "middle";
    messageField.x = canvas.width / 2;
    messageField.y = canvas.height / 2;
    stage.addChild(messageField);
    stage.update();
}

function startGame() {
    canvas.style.backgroundColor = "#ffffff";

    stage.removeAllChildren();
    stage.clear();

    canvas.onclick = null;

    var img = new createjs.Bitmap("amazon.jpg");
    var key1 = new createjs.Bitmap("key1.png");
    var key2 = new createjs.Bitmap("Key2.png");
    var key1Pixelated = new createjs.Bitmap("key1Pixel.png");
    var key2Pixelated = new createjs.Bitmap("Key2Pixel.png");
    var key1Text = new createjs.Text("$25 Key 1", "16px Sans-serif");
    var key2Text = new createjs.Text("$25 Key 2", "16px Sans-serif");
    var revealBtn = new Button("Reveal Now!", "#ff0000");

    img.setTransform(200, 10, 0.8, 0.8);
    key1Pixelated.setTransform(50, 225);
    key2Pixelated.setTransform(525, 225);
    key1Text.setTransform(125, 200);
    key2Text.setTransform(600, 200);
    revealBtn.setTransform(325, 325);

    stage.addChild(img);
    stage.addChild(key1Pixelated);
    stage.addChild(key2Pixelated);
    stage.addChild(key1Text);
    stage.addChild(key2Text);
    stage.addChild(revealBtn);

    createjs.Tween.get(img, {loop: true})
        .to({x: 400}, 1000, createjs.Ease.getPowInOut(3))
        .to({x: 200}, 1000, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

    stage.update();
}
