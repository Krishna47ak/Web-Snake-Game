let inputDir ={x:0 , y:0}
const foodsound =new Audio("SOUND/food.mp3")
const gameoversound =new Audio("SOUND/gameover.mp3")
const movesound =new Audio("SOUND/move.mp3")
const musicsound =new Audio("SOUND/music.mp3") 
let speed = 9;
let score = 0;
let lastPaintTime=0;
let snakeArr=[{x:15, y:6}]
let food={x:10, y:10}


function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {       
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into wall
    if (snake[0].x >= 35 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    // musicsound.play();
    // Updating snake array & food
    if (isCollide(snakeArr)){
        gameoversound.play();
        musicsound.pause();
        inputDir = {x:0 , y:0};
        alert("Game Over!!! Press any key to start again.");
        snakeArr=[{x:15,y:6}];
        // musicsound.play();
        score=0;
    }

    // If you have eaten the food.Increment the score and regenerate the food.
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y){
        score+=10
        scoreBox.innerHTML = "Score :"+ score
        if (score > hiscoreval){
            hiscoreval=score
            localStorage.setItem("Highscore", JSON.stringify(hiscoreval))
            // hiscore.innerHTML = "Highscore :" + hiscoreval
        }
        foodsound.play();
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y : snakeArr[0].y + inputDir.y});
        let a = 1;
        let b = 34;
        let c = 1;
        let d = 19;
        food = {x : Math.round(a+(b-a)*Math.random()), y : Math.round(c+(d-c)*Math.random())};
    }

    //Set highscore
    let Highscore = localStorage.getItem("Highscore");  //This should be inside the function
    if (Highscore==null){
        hiscoreval=0;
        localStorage.setItem("Highscore", JSON.stringify(hiscoreval))
    }
    else {
        hiscoreval = JSON.parse(Highscore)
        // hiscore.innerHTML = "Highscore :" + Highscore   Why it's showing hiscore id not defined with this name
        hiscore.innerHTML = "Highscore :" + Highscore
    }
 
    // Moving the snake
    for (let i = snakeArr.length - 2; i >=0; i--) {        
        snakeArr[i+1] = {...snakeArr[i]}; //Destructuring for correcting reference problem
    }

    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index===0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}

window.requestAnimationFrame(main);

// Controls of the game
window.addEventListener("keydown",e =>{
    //inputDir={x:0,y:1 }  //Start the game
    switch (e.key) {
        case "ArrowUp":
            console.log("AROOOOW up!!")
            inputDir.x= 0;
            inputDir.y= -1;
            movesound.play();
            break;
        case "ArrowDown":
            console.log("AROOOOW down!!")
            inputDir.x= 0;
            inputDir.y= 1;
            movesound.play();
            break;
        case "ArrowRight":
            console.log("AROOOOW right!!")
            inputDir.x= 1;
            inputDir.y= 0;
            movesound.play();
            break;
        case "ArrowLeft":
            console.log("AROOOOW left!!")
            inputDir.x= -1;
            inputDir.y= 0;
            movesound.play();
            break;
        
        default:
            break;
    }
})