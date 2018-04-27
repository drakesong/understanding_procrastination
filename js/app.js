var canvas;
var stage;
var canvasNonPro;
var stageNonPro;
var canvasPro;
var stagePro;
var frust0;
var frust1;
var frust2;
var key1;
var key2;
var key1Pixelated;
var key2Pixelated;
var key1Text;
var key2Text;
var revealBtn;
var border;
// var currentTime;
// var running = false;
var time = 0;
var timeText = new createjs.Text("Time: " + time, "20px Arial", "#000000");

var circle0 = new createjs.Graphics();
circle0.setStrokeStyle(1);
circle0.beginStroke(createjs.Graphics.getRGB(255, 0, 0));
circle0.beginFill(createjs.Graphics.getRGB(255, 0, 0));
circle0.drawCircle(0, 0, 40);

var circle1 = new createjs.Graphics();
circle1.setStrokeStyle(1);
circle1.beginStroke(createjs.Graphics.getRGB(0, 255, 0));
circle1.beginFill(createjs.Graphics.getRGB(0, 255, 0));
circle1.drawCircle(0, 0, 40);

var rect0 = new createjs.Graphics();
rect0.setStrokeStyle(1);
rect0.beginStroke(createjs.Graphics.getRGB(0, 0, 255));
rect0.beginFill(createjs.Graphics.getRGB(0, 0, 255));
rect0.drawRect(0, 0, 40, 60);

var rect1 = new createjs.Graphics();
rect1.setStrokeStyle(1);
rect1.beginStroke(createjs.Graphics.getRGB(255, 140, 102));
rect1.beginFill(createjs.Graphics.getRGB(255, 140, 102));
rect1.drawRect(0, 0, 40, 60);

var rect2 = new createjs.Graphics();
rect2.setStrokeStyle(1);
rect2.beginStroke(createjs.Graphics.getRGB(255, 83, 26));
rect2.beginFill(createjs.Graphics.getRGB(255, 83, 26));
rect2.drawRect(0, 0, 40, 60);

var rect3 = new createjs.Graphics();
rect3.setStrokeStyle(1);
rect3.beginStroke(createjs.Graphics.getRGB(153, 38, 0));
rect3.beginFill(createjs.Graphics.getRGB(153, 38, 0));
rect3.drawRect(0, 0, 40, 60);

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

    canvasFrust0 = document.getElementById("frust0Canvas");
    canvasFrust1 = document.getElementById("frust1Canvas");
    canvasFrust2 = document.getElementById("frust2Canvas");
    stageFrust0 = new createjs.Stage(canvasFrust0);
    stageFrust1 = new createjs.Stage(canvasFrust1);
    stageFrust2 = new createjs.Stage(canvasFrust2);

    frustration0(canvasFrust0, stageFrust0);
    frustration1(canvasFrust1, stageFrust1);
    frustration2(canvasFrust2, stageFrust2);
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

    var img = new createjs.Bitmap("img/amazon.jpg");

    key1 = new createjs.Bitmap("img/key1.png");
    key2 = new createjs.Bitmap("img/key2.png");
    key1Pixelated = new createjs.Bitmap("img/key1Pixel.png");
    key2Pixelated = new createjs.Bitmap("img/key2Pixel.png");
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
        title: 'Mean Body Mass Index (BMI) between Non-Delayers and Delayers (lower is better)',
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
        title: 'Mean SAT Scores between Non-Delayers and Delayers (higher is better)',
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
    var worker = new createjs.Shape(circle0);
    var work = new createjs.Shape(rect0);

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
    var worker = new createjs.Shape(circle0);
    var work = new createjs.Shape(rect0);

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

function frustration0(canvas, stage) {
    var worker = new createjs.Shape(circle1);
    var work = new createjs.Shape(rect1);
    var done = 0;
    var doneText = new createjs.Text("Done: " + done, "20px Arial", "#000000");
    var waitTime = calculateProcrastination(0.5, 0.5, 0.5, 0.5, 0.5, 0.01, 0.5, 0.5, 0.5, 0.5) * 1000;
    console.log(waitTime);

    worker.x = canvas.width / 2;
    worker.y = canvas.height / 2;

    work.x = 20;
    work.y = canvas.height / 2 - 30;

    timeText.x = 10;
    timeText.y = 10;

    doneText.x = 300;
    doneText.y = 10;

    stage.addChild(worker);
    stage.addChild(work);
    stage.addChild(timeText);
    stage.addChild(doneText);

    createjs.Tween.get(timeText, { loop: true })
        .call(changeTextTime, [timeText])
        .call(incrementTime)
        .wait(1000);
    createjs.Tween.get(worker, { loop: true })
        .to({ x: 100 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 300 }, waitTime, createjs.Ease.getPowInOut(3))
        .to({ x: 200 }, 1000, createjs.Ease.getPowInOut(3));
    createjs.Tween.get(work, { loop: true })
        .wait(1000)
        .to({ x: 340 }, waitTime, createjs.Ease.getPowInOut(3))
        .to({ x: 340 }, 1000, createjs.Ease.getPowInOut(3))
        .call(incrementDone)
        .call(changeTextDone);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

    stage.update();

    function incrementDone() {
        // console.log(done);
        return done++;
    }

    function changeTextDone() {
        doneText.text = "Done: " + done;
        return doneText;
    }
}

function frustration1(canvas, stage) {
    var worker = new createjs.Shape(circle1);
    var work = new createjs.Shape(rect2);
    var timeClone = timeText.clone();
    var done = 0;
    var doneText = new createjs.Text("Done: " + done, "20px Arial", "#000000");
    var waitTime = calculateProcrastination(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5) * 1000;

    worker.x = canvas.width / 2;
    worker.y = canvas.height / 2;

    work.x = 20;
    work.y = canvas.height / 2 - 30;

    doneText.x = 300;
    doneText.y = 10;

    stage.addChild(worker);
    stage.addChild(work);
    stage.addChild(timeClone);
    stage.addChild(doneText);

    createjs.Tween.get(timeClone, { loop: true })
        .wait(1000)
        .call(changeTextTime, [timeClone]);
    createjs.Tween.get(worker, { loop: true })
        .to({ x: 100 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 300 }, waitTime, createjs.Ease.getPowInOut(3))
        .to({ x: 200 }, 1000, createjs.Ease.getPowInOut(3));
    createjs.Tween.get(work, { loop: true })
        .wait(1000)
        .to({ x: 340 }, waitTime, createjs.Ease.getPowInOut(3))
        .to({ x: 340 }, 1000, createjs.Ease.getPowInOut(3))
        .call(incrementDone)
        .call(changeTextDone);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

    stage.update();

    function incrementDone() {
        // console.log(done);
        return done++;
    }

    function changeTextDone() {
        doneText.text = "Done: " + done;
        return doneText;
    }
}

function frustration2(canvas, stage) {
    var worker = new createjs.Shape(circle1);
    var work = new createjs.Shape(rect3);
    var timeClone = timeText.clone();
    var done = 0;
    var doneText = new createjs.Text("Done: " + done, "20px Arial", "#000000");
    var waitTime = calculateProcrastination(0.5, 0.5, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 0.5) * 1000;

    worker.x = canvas.width / 2;
    worker.y = canvas.height / 2;

    work.x = 20;
    work.y = canvas.height / 2 - 30;

    doneText.x = 300;
    doneText.y = 10;

    stage.addChild(worker);
    stage.addChild(work);
    stage.addChild(timeClone);
    stage.addChild(doneText);

    createjs.Tween.get(timeClone, { loop: true })
        .wait(1000)
        .call(changeTextTime, [timeClone]);
    createjs.Tween.get(worker, { loop: true })
        .to({ x: 100 }, 1000, createjs.Ease.getPowInOut(3))
        .to({ x: 300 }, waitTime, createjs.Ease.getPowInOut(3))
        .to({ x: 200 }, 1000, createjs.Ease.getPowInOut(3))
    createjs.Tween.get(work, { loop: true })
        .wait(1000)
        .to({ x: 340 }, waitTime, createjs.Ease.getPowInOut(3))
        .to({ x: 340 }, 1000, createjs.Ease.getPowInOut(3))
        .call(incrementDone)
        .call(changeTextDone);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

    stage.update();

    function incrementDone() {
        // console.log(done);
        return done++;
    }

    function changeTextDone() {
        doneText.text = "Done: " + done;
        return doneText;
    }
}

function incrementTime() {
    console.log(time);
    return time++;
}

function changeTextTime(t) {
    t.text = "Time: " + time;
    return t;
}

function calculateProcrastination(im, ss, c, e, b, f, st, d, p, i) {
    return ((im + i)**3 * (ss + (b + f)/(c + p)) * d) / (st * e * (c + p/im));
}
