function setup(){

  friends = new friends();

  Safezone = new Group();
  createCanvas(windowWidth, windowHeight);
  makeSafeZone();
  makeWarZone();
  friends.makeFriends(1);
  friends.makeFood(100);

  Safezone.displace(Friends);

};

function draw(){

  background(51);
  drawSprites();
  friends.AllFriends();

};

function makeSafeZone() {

    var color1 = 100;
    var color2 = 190;
    var color3 = 100;

    var c = createSprite(windowWidth/2, 0, windowWidth, 100); //top
    c.shapeColor = color(color1,color2,color3);
    c.mass = 100;
    c.restitution = 0;
    Safezone.add(c);
    var c = createSprite(windowWidth, windowHeight/2, 100, windowHeight); // right
    c.shapeColor = color(color1,color2,color3);
    c.mass = 100;
    c.restitution = 0;
    Safezone.add(c);
    var c = createSprite(windowWidth/2, windowHeight, windowWidth, 100); // bottom
    c.shapeColor = color(color1,color2,color3);
    c.mass = 100;
    c.restitution = 0;
    Safezone.add(c);
    var c = createSprite(0, windowHeight/2, 100, windowWidth); // left
    c.shapeColor = color(color1,color2,color3);
    c.mass = 100;
    c.restitution = 0;
    Safezone.add(c);
};

function makeWarZone() {

  warZone = createSprite(windowWidth/2, windowHeight/2, windowWidth-100, windowHeight-100);
  warZone.shapeColor = color(244, 182, 66);

};
