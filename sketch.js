var dog1, dog, happydogimg, database, foodS, foodStock,background;
var feed, addFeed;
var feedTime,lastFeed;
var foodObj;
var PLAY;
var gameState ;
var END;
//var  state;
function preload()
{
  //load images here
  hungryDog = loadImage("images/Dog.png");
  happydogimg = loadImage("images/Happy.png");
  bedroomimg = loadImage("images/Bed Room.png"); 
  gardenimg = loadImage("images/Garden.png");
  washroomimg = loadImage("images/Wash Room.png");
  sleepimg = loadImage("images/Lazy.png");
  runimg = loadImage("images/running.png"); 
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  dog1 = createSprite(800,220);
  dog1.addImage("Hungry",hungryDog);
  dog1.scale = 0.15

  feedTime = database.ref("FeedTime");
  feedTime.on("value", function(data){
    lastFeed = data.val();
  });
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background("#2e8a57");
feedTime = database.ref("FeedTime");
feedTime.on("value", function(data){
  lastFeed = data.val();
});
 
currentTime = hour();
if(currentTime == (lastFeed+1)){
update("Playing");
background(gardenimg);
//foodObj.garden();
}
else if(currentTime ==(lastFeed+2)){
update("Sleeping");
background("#2e8a57");
dog1.addImage(sleepimg);
//foodObj.bedroom();
}
else if(currentTime>(lastFeed+2) && currentTime<=(lastFeed+4)){
update("Bathing");
background(washroomimg);
//foodObj.washroom();
}
else{
  update("Hungry");
  foodObj.display();
}

if(gameState !="Hungry"){
feed.hide();
addFood.hide();
dog1.remove();
}
else{
  feed.show();
  addFood.show();
  dog1.addImage(hungryDog);
}
fill(255)
textSize(20);
if(lastFeed >= 12){
  text("Last Feed : "+ lastFeed % 12 + "PM", 350,30);
} 
else if(lastFeed == 0){
text("Last Feed : 12 AM"+350,30);
}
else{
text("Last Feed : "+lastFeed + "AM",350,30);
}

foodObj.display();
drawSprites();
}

function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog1.addImage(happydogimg);
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  Food: foodObj.getFoodStock(),
  feedTime: hour(),
  gameState:"hungry"
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}

function update(state){
  database.ref('/').update({
    gameState : state
  });
}


/*var dog1, dog, happydogimg, database, foodS, foodStock,background;
var feed, addFeed;
var feedTime,lastFeed;
var foodObj;
//var PLAY;
var gameState ;
//var END;
//var  state;
function preload()
{
  //load images here
  sadDog = loadImage("images/Dog.png");
  happydogimg = loadImage("images/Happy.png");
  bedroomimg = loadImage("images/Bed Room.png"); 
  gardenimg = loadImage("images/Garden.png");
  washroomimg = loadImage("images/Wash Room.png");
  sleepimg = loadImage("images/Lazy.png");
  runimg = loadImage("images/running.png"); 
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feedTime = database.ref("FeedTime");
feedTime.on("value", function(data){
  lastFeed = data.val();
});
  
readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  dog1 = createSprite(800,220);
  dog1.addImage("Hungry",sadDog);
  //dog1.addImage("happy",happydogimg);
/* dog1.addImage("Sleeping",bedroomimg);
 dog1.addImage("Playing",gardenimg);
 dog1.addImage("Bathing",washroomimg);
  dog1.addImage(sleepimg);
  dog1.addImage(runimg); */
 /* dog1.scale = 0.15

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background("#2e8a57");

 
currentTime = hour();
if(currentTime == (lastFeed+1)){
update("Playing");
foodObj.garden();
}
else if(currentTime ==(lastFeed+2)){
update("Sleeping");
foodObj.bedroom();
}
else if(currentTime>(lastFeed+2) && currentTime<=(lastFeed+4)){
update("Bathing");
foodObj.washroom();
}
else{
  update("Hungry");
  foodObj.display();
}

if(gameState !="Hungry"){
feed.hide();
addFood.hide();
dog1.remove();
}
else{
  feed.show();
  addFood.show();
  dog1.addImage(sadDog);
}
fill(255)
textSize(20);
if(lastFeed >= 12){
  text("Last Feed : "+ lastFeed % 12 + "PM", 350,30);
} 
else if(lastFeed == 0){
text("Last Feed : 12 AM"+350,30);
}
else{
text("Last Feed : "+lastFeed + "AM",350,30);
}

//foodObj.display();
drawSprites();
}

function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog1.addImage(happydogimg);
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  Food: foodObj.getFoodStock(),
  feedTime: hour(),
  gameState : "Hungry"
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}

function update(state){
  database.ref('/').update({
    gameState : state
  })
} */

 