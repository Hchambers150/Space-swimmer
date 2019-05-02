// Friends!

function friends(){

  Friends = new Group();
  Food = new Group();

  this.makeFriends = function(amount){

    for(var i = 0; i < amount; i++){
      randomX = random(0, windowWidth);
      randomY = random(0, windowHeight);
      size = 20;
      var c = createSprite(randomX, randomY, size, size);
      c.d = createSprite(randomX, randomY, 0, 0);

      if(c.overlap(warZone) == false){
        c.shapeColor = color(255 - i*3);
        c.maxSpeed = 3;
        c.mass = 1;
        c.friction = 0.5;
        c.foodCount = 0;
        c.lifespan = 50;
        Friends.add(c);

        c.d.setCollider("circle", 0, 0, 100);
        c.d.debug = true;
        c.d.callout = false;

      } else {
        c.remove();
        i--;
      };
    };
    //console.log(Friends.length);
  };

  this.AllFriends = function(){

    for(var i = 0; i < Friends.length; i++){

      //console.log(Friends[i].lifespan);

      //console.log(Friends[i].d.callout);
      //console.log(i);
      this.lockOn(i);
      this.friendsMove(i, 0);
      //this.stayOnScreen(i);
      //this.returnHome(i);

      //this.killFriends(i);

      Friends.bounce(Safezone);
      Friends[i].shapeColor = color(255, 255, 255-Friends[i].lifespan);
      Friends[i].collide(Food, this.eats);
      Friends[i].d.collide(Food, this.noticeFood);
    };

  }

  this.friendsMove = function(i, urgency){

      // Friends[i].setSpeed(
      //   random(-(Friends[i].maxSpeed+urgency), (Friends[i].maxSpeed+urgency)),
      //   random(-(Friends[i].maxSpeed+100), (Friends[i].maxSpeed+100))
      // );


      Friends[i].setSpeed(40);

      Friends[i].d.position.x = Friends[i].position.x;
      Friends[i].d.position.y = Friends[i].position.y;
  };

  this.noticeFood = function(FriendIQ, FoodIQ){

    FriendIQ.position.x = FoodIQ.position.x;
    FriendIQ.position.y = FoodIQ.position.y;
    FriendIQ.callout = true;

  };

  this.lockOn = function(i){

    if(Friends[i].d.callout == true){
      var x = Friends[i].position.x - Friends[i].d.position.x;
      var y = Friends[i].position.y - Friends[i].d.position.y;

      //console.log("y:", y, "x:", x);

      Friends[i].attractionPoint(0.1*Friends[i].mass/10, Friends[i].d.position.x, Friends[i].d.position.y);

// soh cah toa

      Friends[i].d.callout = false;
      // console.log(cos(x*y));
    }

  }

  this.killFriends = function(i){

    if(Friends[i].overlap(Safezone) == false){
      Friends[i].lifespan--;
      if(Friends[i].lifespan <= 1){
        Friends[i].shapeColor = color(0,0,255);
        Friends[i].maxSpeed = 0;
        Friends[i].remove();
      };
    };
  };

  this.returnHome = function(i){
    if(Friends[i].lifespan < 50){

      if(Friends[i].overlap(Safezone) == false){
        Friends[i].shapeColor = color(244, 66, 241);
        //Friends[i].setSpeed(50);
        // this.friendsMove(i, Friends.lifespan);
      } else {
        Friends[i].maxSpeed = 0;
      }
    };
  };

  this.stayOnScreen = function(i){
    //console.log(size/2);
    if(Friends[i].position.x > windowWidth-size/2){
      Friends[i].position.x = windowWidth-size/2;
      Friends[i].setSpeed(0,0);
    };
    if(Friends[i].position.x < 0+size/2){
      Friends[i].position.x = 0+size/2;
      Friends[i].setSpeed(0,0);
    };

    if(Friends[i].position.y > windowHeight-size/2){
      Friends[i].position.y = windowHeight-size/2;
      Friends[i].setSpeed(0,0);
    };
    if(Friends[i].position.y < 0+size/2){
      Friends[i].position.y = 0+size/2;
      Friends[i].setSpeed(0,0);
    };
  };

  this.makeFood = function(amount){
    for(var i = 0; i < amount; i++){
      randomX = random(50, windowWidth-50);
      randomY = random(50, windowHeight-50);
      var c = createSprite(randomX, randomY, 10, 10);
      c.shapeColor = color(255, 0, 0);
      c.stalk = createSprite(randomX, randomY-5, 3, 3);
      c.stalk.shapeColor = color(100,255,100);

      Food.add(c);

      // this.test();
    };
  };

  this.eats = function(FriendIQ, FoodIQ){
    FoodIQ.stalk.remove();
    FoodIQ.remove();
    FriendIQ.lifespan = FriendIQ.lifespan + 50;
    FriendIQ.foodcount++;
    FriendIQ.mass++;
  };

};
