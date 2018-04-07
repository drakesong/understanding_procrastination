function init() {
    var stage = new createjs.Stage("canvas");
    var img = new createjs.Bitmap("amazon.jpg");
    img.setTransform(200, 10, 0.8, 0.8);
    stage.addChild(img);
    createjs.Tween.get(img, {loop: true})
        .to({x: 400}, 1000, createjs.Ease.getPowInOut(3))
        .to({x: 200}, 1000, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}
