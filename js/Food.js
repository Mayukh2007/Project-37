class Food {
    constructor() {
        this.image = loadImage("Milk.png");
        this.foodStock = 0;
        this.lastFed;
    }
    getFoodStock() {
        return this.foodStock;
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    decuctFood() {
        if(this.foodStock > 0) {
            this.foodStock=this.foodStock-1;
        }
    }

    getFedTime(fedTime){
        this.lastFed = fedTime;
    }

    display() {
        
        if (gameState==="Hungry") {
    var x = 80, y = 180;
    imageMode(CENTER);
    image(this.image, 180, 450, 70, 70);
    

        if(this.foodStock != 0) {
        for(var i = 0; i < this.foodStock; i++) {
            if(i % 16 == 0) {
                x = 50;
                y = y +50;
            }
            image(this.image, x, y, 50, 50);
            x=x+30;
        }   
    }
}
    
    if (gameState==="Hungry"){
    textSize(20);
    fill("snow");
    if(fedTime >= 12) {
        text("Last Fed: " + fedTime%12 + " PM", 350, 30);
      }
      else if(fedTime == 0) {
        text("Last Fed: 12 AM", 350, 30);
      }
      else{
        text("Last Fed: " + fedTime + " AM", 350, 30);
      }
    }
}
bedroom(){
    background(bedroom,550,550);  
  }
  
garden(){
    background(garden,550,550);  
  } 
  
washroom(){
    background(washroom,550,500); 
  }
}