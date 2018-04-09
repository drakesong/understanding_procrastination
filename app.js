var canvas;
var stage;
var canvasNonPro;
var stageNonPro;
var canvasPro;
var stagePro;

var key1;
var key2;
var key1Pixelated;
var key2Pixelated;
var key1Text;
var key2Text;
var revealBtn;
var border;
var currentTime;
// var running = false;

var circle = new createjs.Graphics();
circle.setStrokeStyle(1);
circle.beginStroke(createjs.Graphics.getRGB(255, 0, 0));
circle.beginFill(createjs.Graphics.getRGB(255, 0, 0));
circle.drawCircle(0, 0, 40);

var rect = new createjs.Graphics();
rect.setStrokeStyle(1);
rect.beginStroke(createjs.Graphics.getRGB(0, 0, 255));
rect.beginFill(createjs.Graphics.getRGB(0, 0, 255));
rect.drawRect(0, 0, 40, 60);

function init() {
    canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(50);

    initialScreen();

    canvas.onclick = startGame;

    canvasNonPro = document.getElementById("nonProCanvas");
    stageNonPro = new createjs.Stage(canvasNonPro);

    nonPro();

    canvasPro = document.getElementById("proCanvas");
    stagePro = new createjs.Stage(canvasPro);

    pro();
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
    // running = true;

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

    createjs.Tween.get(img, { loop: true })
        .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 200 }, 1000, createjs.Ease.getPowInOut(3));
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

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart1);
google.charts.setOnLoadCallback(drawChart2);

function drawChart1() {
    var data = google.visualization.arrayToDataTable([
        ['Type', 'BMI', { role: 'style' }],
        ['Non-Delayer', 27.5, 'rgb(51, 102, 204)'],
        ['Delayer', 24.4, 'rgb(220, 57, 18)']
    ]);

    var options = {
        title: 'Mean Body Mass Index (BMI) between Non-Delayers and Delayers',
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
        vAxis: {
            viewWindow: {
                min: 0,
                max: 35
            }
        },
        width: 600,
        height: 400
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
    chart.draw(data, options);
}

function drawChart2() {
    var data = google.visualization.arrayToDataTable([
        ['SAT Test', 'Non-Delayer', 'Delayer'],
        ['Verbal', 524, 610],
        ['Math', 528, 652]
    ]);

    var options = {
        title: 'Mean SAT Scores between Non-Delayers and Delayers',
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
        vAxis: {
            viewWindow: {
                min: 0,
                max: 900
            }
        },
        width: 600,
        height: 400
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
}

function nonPro() {
    var worker = new createjs.Shape(circle);
    var work = new createjs.Shape(rect);

    worker.x = canvasNonPro.width / 2;
    worker.y = canvasNonPro.height / 2;

    work.x = 117;
    work.y = canvasNonPro.height / 2 - 30;

    stageNonPro.addChild(worker);
    stageNonPro.addChild(work);

    createjs.Tween.get(worker, { loop: true })
        .to({ x: 200 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 600 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(3));
    createjs.Tween.get(work, { loop: true })
        .to({ x: 117 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 640 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 640 }, 1000, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stageNonPro);

    stageNonPro.update();
}

function pro() {
    var worker = new createjs.Shape(circle);
    var work = new createjs.Shape(rect);

    worker.x = canvasPro.width / 2;
    worker.y = canvasPro.height / 2;

    work.x = 117;
    work.y = canvasPro.height / 2 - 30;

    stagePro.addChild(worker);
    stagePro.addChild(work);

    createjs.Tween.get(worker, { loop: true })
        .to({ x: 200 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 200 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ y: 100 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ y: 100 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ y: 300 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ y: 300 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 200, y: 200 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 250 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 600, y: 50 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 600, y: 50 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 400, y: 200 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 250 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 450 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 100, y:300 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 100, y:300 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 450, y: 200 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 600 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(3));
    createjs.Tween.get(work, { loop: true })
        .to({ x: 117 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 117 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 117 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 117 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 117 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 117 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 117 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 117 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 117 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 167 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 167 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 167 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 167 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 167 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 367 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 367 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 367 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 367 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 640 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 640 }, 1000, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stagePro);

    stagePro.update();
}
