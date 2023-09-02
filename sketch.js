var splashimg
var gameState = "wait"
var playbutton, soundonbutton, obstacle, soundoffbutton, ground, level1bg, player, playeridle, playerrun, playerjump,sugar
var health = 0
var maxHealth = 400
var playerimg1
var score1 = 0
var spike
var spike1 ,collectibleGroup
var  health1 = 0
var weaponimg,enemy1img,enemy2img,weaponsG,enemyGroup,enemy,weapon

function preload() {
    splashimg = loadImage("Rumble_runner.gif")
    bgSound = loadSound("bgMusic.mp3")

    level1bg = loadImage("bg.png")
    playeridle = loadImage("sugar.png")

    er1 = loadImage("er1.png")
    er2 = loadImage("er2.png")
    er3 = loadImage("er3.png")
    sugar = loadImage("sugar.png")
    
    playerwalkimg=loadAnimation("er1.png","er1.png","er2.png","er2.png","er3.png","er3.png","er4.png","er4.png")

    weaponimg=loadImage("weapon.gif")

    enemy1img = loadImage("enemy1.png")
    enemy2img = loadImage("enemy2.gif")

}

function setup() {
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("play.png")
    playbutton.position(width / 2 - 150, height - height / 5)
    playbutton.size(150, 150)



    soundonbutton = createImg("soundon.png")
    soundonbutton.position(playbutton.x + 150, playbutton.y + 15)
    soundonbutton.size(150, 115)
    soundonbutton.mouseClicked(mute)
    // soundonbutton.hide()


    soundoffbutton = createImg("sounoff.png")
    soundoffbutton.position(playbutton.x + 150, playbutton.y + 10)
    soundoffbutton.size(120, 125)
    soundoffbutton.hide()
    soundoffbutton.mouseClicked(mute)


    weaponsG=new Group()
    enemyGroup= new Group()


    ground = createSprite(width / 1.5, height / 2)
    ground.addImage(level1bg)
    ground.visible = false
    // ground.scale=2.8

    player = createSprite(width / 1.5, height / 1.75)
    // player.addImage(playeridle)
    player.addAnimation("walk",playerwalkimg)
    player.scale = 2
    player.visible = false
    player.speed=0.05

collectibleGroup=new Group()



}
function draw() {

    if (gameState === "wait") {
        // if (!bgSound.isPlaying) {
        //     bgSound.play()
        // }
        background(splashimg)
    }


    playbutton.mousePressed(() => {
        gameState = "level1"
        playbutton.hide()
    })

    if (gameState == "level1") {
        // background(level1bg)
        image(level1bg, 0, 0, width * 4, height)
        playbutton.hide()
        soundoffbutton.hide()
        soundonbutton.hide()

        player.visible = true
        camera.x = player.x
        camera.y = player.y
        if (keyDown("RIGHT_ARROW")) {
            player.x += 4
        }

        if (keyDown("LEFT_ARROW")) {
            player.x -= 2
        }
        obstacles()



    }




    if(gameState=="level2"){

        image(level1bg, 0, 0, width * 4, height)
        playbutton.hide()
        soundoffbutton.hide()
        soundonbutton.hide()
        spawnEnemies()
        
        
        player.visible = true
        camera.x = player.x
        camera.y = player.y

        for(i=0;i<enemyGroup.length;i++){
            if(enemyGroup.get(i).isTouching(player)){
            //    player.addImage(ballHit) 
               player.destroy()
              gameState= "end"
               
            }}



       
            if (keyDown("space")) {
                spawnweapon()
                // weapon = createSprite(player.x + (player.width) / 2, player.y)
                // weapon.addAnimation("shoot", weaponimg)
            
                // //weapon.visible=false 
                // weapon.velocityX = 8
                // weaponsG.add(weapon)
                weapon.x = (player.x + (player.width) / 2)
                weapon.changeAnimation("shoot", weaponimg)
                weapon.velocityX = 8


            }
            if (keyDown(RIGHT_ARROW)) {
                player.x = player.x + 15
            }
            if (keyDown(LEFT_ARROW)) {
                player.x = player.x - 15
            }
            if (player.x < 0) {
                player.x = 10
            }
            if (player.x > width) {
                player.x = width - 100
            }
    
    
            // if (player.y > height) {
            //     player.y = height - 10
            // }
            // if (player.y < 0) {
            //     player.y = 10
            // }
    }



    if (gameState == "end") {

        gameOver()
    }

    if (gameState == "win") {

        gameWin()
    }


    drawSprites()

    if (gameState == "level1") {
        textSize(50)
        fill("cyan")
        stroke("blue")
        strokeWeight(4)
        text("LEVEL 1", player.x - 100, 100)
         text("Health : "+health, player.x + 300, 100)
      


        for(i=0;i<collectibleGroup.length;i++){
    if(collectibleGroup.get(i).isTouching(player)){
       health +=10
       collectibleGroup.get(i).destroy()
    }}

    
if(health>=50){
    level1Won()
    collectibleGroup.destroyEach()
}

    }




// level 2


if (gameState == "level2") {
    textSize(50)
    fill("yellow")
    stroke(255, 0, 0)
    strokeWeight(2)
    text("LEVEL 2", player.x - 100, 100)
  

    text("Health : "+health1, player.x + 300, 100)

    for(i=0;i<collectibleGroup.length;i++){
        if(collectibleGroup.get(i).isTouching(player)){
           health1 +=10
           collectibleGroup.get(i).destroy()
        }}

        for(i=0;i<enemyGroup.length;i++){
            if(enemyGroup.get(i).isTouching(player)){
               health -=5
               enemyGroup.get(i).destroy()
            }}
        
if(health1>=50){
   gameState="win"
    collectibleGroup.destroyEach()
}
if(health1<0){
    gameState="end"
     collectibleGroup.destroyEach()
 }

}


}


function mute() {
    if (bgSound.isPlaying()) {
        bgSound.stop();
        soundoffbutton.show();
        soundonbutton.hide();
        console.log("mute")
    }
    else {
        soundonbutton.show()
        soundoffbutton.hide();
        bgSound.play();
        console.log("unmute")
    }
}





function obstacles() {
    if (frameCount % 10  == 0) {
        rand = Math.round(random(height / 4, height - 100))
        obstacle = createSprite(player.x+width/2, player.y)
        obstacle.velocityX = -2
        obstacle.addImage(sugar)
        collectibleGroup.add(obstacle)
    }
}

// //level 1 won function
function level1Won() {

    swal(
        {

            title: `You ATE enough ICECREAMS !!!`,
            text: "Got the STRENGTH!!!",
            imageUrl: "strength.png",
            imageSize: "250x250",
            confirmButtonText: "LEVEL 2",
            confirmButtonColor: "cyan"
        },
        function (isConfirm) {
            gameState="level2"
        }
    )
}

function spawnweapon() {

    weapon = createSprite(player.x + (player.width) / 2, player.y)
    weapon.addAnimation("shoot", weaponimg)

    //weapon.visible=false 
    weapon.velocityX = 8
    weaponsG.add(weapon)

    // console.log("hit")

}



function spawnEnemies() {
    //write code here to spawn the clouds
    if (frameCount % 120 === 0) {
        rand = Math.round(random(height / 4, height - 100))
            enemy = createSprite(width, rand)
        
        enemy.velocityX = -2
       
        randimg= Math.round(random(1,2))

        switch(randimg){
            case 1: enemy.addImage(enemy1img)
            enemy.scale=0.25
            break;

            case 2: enemy.addImage(enemy2img)
            enemy.scale=0.25
            break;
            

        }

        //adding cloud to the group
        enemyGroup.add(enemy);
    }
}

function gameOver() {
    swal(
        {

            title: `You LOST!!!`,
            text: "Get back to the Misson Again",
            imageUrl: "GhostImg.jpg",
            imageSize: "200x200",
            confirmButtonText: "Restart",
            confirmButtonColor: "cyan"
        },
        function () {

            window.location.reload();
        }

    )
}


function gameWin() {
    swal(
        {

            title: `You WON!!!`,
            text: "Get back to the Misson Again",
            imageUrl: "HunterImage.png",
            imageSize: "200x200",
            confirmButtonText: "Restart",
            confirmButtonColor: "cyan"
        },
        function () {

            window.location.reload();
        }

    )
}