class Food{
    constructor(){
        this.image=loadImage("Milk.png");

        this.foodStock=0;
        this.lastFed;  
    }
    getFoodStock()
    {
    return this.foodStock;
    }

    updateFoodStock(foodStock)
    {
        this.foodStock=foodStock;
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
      }
   

    deductFood()
    {
      if(this.foodStock>0){
        this.foodStock=this.foodStock-1;
      }
        
    }
      
    bedroom(){
         background(bedroomImg,550,500)
    }
    
    garden(){
        background(gardenImg,550,500)
    }
   
    washroom(){
         background(washroomImg,550,500)
    }



    
    
    
    
    display(){
    var x=80,y=100;
    
    imageMode(CENTER);
 
    
    if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x=30;
          y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
      }
    }
  
}
} 

