//create the variables for the ball
var ball,database;
var position;

function setup()
{
    //use the firebase database
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //give a refrence point for the ballPosition
    var ballPosition = database.ref('ball/position');
    ballPosition.on("value",readPosition,showError);
}

function draw()
{
    //conditions for the movement of the ball
    background("white");
    if(position !== undefined)
    {
    if(keyDown(LEFT_ARROW))
    {
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW))
    {
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW))
    {
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW))
    {
        writePosition(0,+1);
    }
    }
    drawSprites();

}

function writePosition(x,y)
{
    // set the position of the ball
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    }) ;
}

function readPosition(data)
{
    //read the value of the position
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;

}

function showError()
{
    //show the error
    console.log('Error');
}
