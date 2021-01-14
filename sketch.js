var dog, dogHappy, database, foodS,foodStock,dogImage, foodObject,feed,add,fedTime,gameState,garden,washroom,bedroom;

function preload(){
 dogImage = loadImage("Dog.png");
 dogHappy = loadImage("happydog.png");
 garden = loadImage("Playing.png");
 washroom = loadImage("WashRoom.png");
 bedroom = loadImage("BedRoom.png");
}

function setup() {
  database = firebase.database();

  createCanvas(550, 550);
  
  dog = createSprite(250,450,5,5);
  dog.scale = 0.2;
  dog.addImage(dogImage);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  
  fedTime = database.ref("fedTime");
  fedTime.on("value", function(data){
    fedTime = data.val();
  });

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
  
  foodObject = new Food();

  feed = createButton("Feed the Dog");
  feed.position(500, 175);
  feed.mousePressed(feedDog);

  add = createButton("Add Food");
  add.position(600, 175);
  add.mousePressed(addFoods);
  
}

function draw() {  
  background("green");
  if (foodS<0){
  foodS=0;
  }
  if (foodS>=31){
    foodS=31;
    }

  foodObject.display();
  
  currentTime=hour();
  if(currentTime==(fedTime+1)){
      update("Playing");
      foodObject.garden();
   }else if(currentTime==(fedTime+2)){
    update("Sleeping");
    foodObject.bedroom();
   }else if(currentTime>(fedTime+2) && currentTime<=(fedTime+4)){
    update("Bathing");
    foodObject.washroom();
   }else{
    update("Hungry")
    foodObject.display();
   }
   
   if(gameState!="Hungry"){
     feed.hide();
     add.hide();
     dog.remove();   
      
   }else{
    feed.show();
    add.show();
    
   }
  
  drawSprites();
  if (gameState==="Hungry"){
  textSize(24);
  fill("snow");
  text("Press the Button to Feed the dog Lucky!", 30, 90);

  textSize(20);
  text("Food Left: " + foodS, 30, 40);
  }
  

}

function readStock(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(dogHappy);

  foodS--;
  database.ref('/').update ({
    Food: foodS,
    fedTime: hour(),
    gameState: "Hungry"
  })
}
function addFoods() {
  dog.addImage(dogImage);

  foodS++;
  database.ref('/').update({
    Food: foodS
  });
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}

