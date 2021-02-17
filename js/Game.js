class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("1",car1Img)
    car2 = createSprite(300,200);
    car2.addImage("2",car2Img)
    car3 = createSprite(500,200);
    car3.addImage("3",car3Img)
    car4 = createSprite(700,200);
    car4.addImage("4",car4Img)

    cars = [car1, car2, car3, car4];
  }

//player count reaches 4 we play the game 
  play(){
    form.hide();
//(static function) that reads the info of all players from the database
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("brown");
      image (trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 240;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 280;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        //here we access the array for sprite objects
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          stroke (10);
          fill ("red");
          ellipse(x,y,60,100)//circle//100 oval 
        }
       
     //textSize(15); //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50;
      player.update();
      console.log(player.distance);
    }
    if(player.distance > 5300){
        gameState=2;
    }

    drawSprites();
  }
  end(){
    console.log("GAME ENDED");
  }
}
