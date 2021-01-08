//Create variables here
var database;
var food,foodStock,nameref,foodS;
var feed,addfood;
var fedTime,lastFed,readState, changeState, gameState;
var bedroomImg, washroomImg, gardenImg;
var sadDog, currentTime;
var input,button,greeting,Name;

function preload()
{
  //load images here
  DogImage = loadImage("Dog.png");
  DogImage2 = loadImage("happydog.png");
  bedroomImg = loadImage("Bed Room.png");
  washroomImg = loadImage("Wash Room.png");
  gardenImg = loadImage("Garden.png");
  sadDog = loadImage("Lazy.png");
}

function setup() {
  createCanvas(500, 500);
  Dog = createSprite(400,250,50,50);
  Dog.addImage(DogImage);
  Dog.scale = 0.3;

  food = new Food()

  database = firebase.database();

  //Reference for food
  foodStock = database.ref("Food");
  foodStock.on("value",read,console.log("error"));

  readState = database.ref("Gamestate");
  readState.on("value", (data) => {
    Gamestate = data.val();
  });

  //foodRef.set(50);
  nameref=database.ref("name");
  nameref.on("value",function(data)
  {
    name=data.val();
  })
  
  //feed the rabbit button
  feed=createButton("Feed the Dog");
  feed.position(580,67);
  feed.mousePressed(feeddog);

  //add food button
  addFood=createButton("Add Food")
  addFood.position(400,100);
  addFood.mousePressed(addFoods);


  input=createInput("Change Pet Name");
  input.position(400,67);
  
  
  button=createButton("SUBMIT");
  button.position(500,90);
  button.mousePressed(renamindog)

  

  
  
}


function draw() {  
  background("Aqua");
  //drawSprites();

  food.display()
   //fetching fedtime from database
   fedTime=database.ref("FeedTime");
   fedTime.on("value",function(data)
   {
     lastFed=data.val();
   })
  
   
 
   fill("white");
   textSize(15);
   if(lastFed>=12)
   {
    fill("purple")
     text("Last Feed : "+ lastFed%12 + " PM",350,30);
   }
   else if(lastFed===0)
   {
    fill("purple")
     text("Last Feed : 12 AM",350,30)
   }
   else
   {
     fill("purple")
     text("Last Feed : "+ lastFed + " AM",350,30);
   }

   if (gameState !== "Hungry") {
    feed.show();
    addFood.show();
    // dog.remove();
  } else {
    feed.hide();
    addFood.hide();
    Dog.addImage("sadDog", sadDog);
  }
 
   if(Name!==undefined)
   {
   text("Your Pet Name: "+ name,55,100);
   }
   currentTime = hour();
  if (currentTime === lastFed + 1) {
    update("Playing");
    food.garden();
  } else if (currentTime === lastFed + 2) {
    update("Sleeping");
    food.bedroom();
  } else if (currentTime > lastFed + 2 && currentTime <= lastFed + 4) {
    update("Bathing");
    food.washroom();
  } else {
    update("Hungry");
    food.display();
  }
 
   //To draw the sprites on canvas
   drawSprites();
 
  
   
 }


  

function read(data){
  foodS= data.val();
  food.updateFoodStock(foodS);
}


function feeddog()
{ if(foodS>0){
  Dog.addImage(DogImage2);
  Dog.scale = 0.3
}
else{
  Dog.addImage(DogImage);
  Dog.scale = 0.3
}

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref("/").update({
    Food: food.getFoodStock(),
    FeedTime: hour()
  })
  
}

//function to add the dog
function addFoods()
{
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

function renamindog()
{
  Name=input.value();
  button.hide();
  input.hide();
  database.ref("/").update({
    name:Name
  })

}

function update(state) {
  database.ref("/").update({
    gameState: state,
  });
}


