var splashimg
var gameState = "wait"
var playbutton, soundonbutton, soundoffbutton, obstacle, collectibleGroup, collectible
var bg1,bg2
var health = 0
var maxHealth = 400
var playerimg1
var score1 = 0
var cd,floppy,weaponimg,weaponsG,weapon
var health1=0

function preload() {
    splashimg = loadImage("Rumble_runner.gif")
    bgSound = loadSound("bgMusic.mp3")
    bg1 = loadImage("bg.png")
    bg2=loadImage("bg.png")

    playeridle = loadAnimation("er1.png","er1.png","er2.png","er2.png","er3.png","er3.png","er4.png","er4.png")

    cd=loadImage("sugar.png")
    floppy=loadImage("sugar.png")
    weaponimg = loadImage("weapon.gif")
    virus1 = loadImage("enemy1.png")
    virus2 = loadImage("batleft.png")
    virus3 = loadImage("enemy2.gif")
    ballHit = loadImage("er4.png")

}



function setup() {
    createCanvas(windowWidth, windowHeight)
    playbutton = createImg("play.png")
    playbutton.position(50, height / 2)
    playbutton.size(150, 150)

    weaponsG = new Group()
    soundonbutton = createImg("soundon.png")
    soundonbutton.position(width - 200, height / 2)
    soundonbutton.size(150, 115)
    soundonbutton.mouseClicked(mute)
    // soundonbutton.hide()


    soundoffbutton = createImg("sounoff.png")
    soundoffbutton.position(width - 200, height / 2)
    soundoffbutton.size(120, 125)
    soundoffbutton.hide()
    soundoffbutton.mouseClicked(mute)


 ground = createSprite(width / 1.5, height / 2)
    ground.addImage(bg1)
    ground.visible = false
    // ground.scale=2.6

    player = createSprite(width / 1.5, height / 1.75)
    // player.addImage(playeridle)
    player.addAnimation("walk",playeridle)
    player.scale = 2
    player.visible = false
    player.speed=0.05

    collectibleGroup = new Group()
    enemyGroup = new Group()


}

function draw() {
    if (gameState === "wait") {
        if (!bgSound.isPlaying) {
            bgSound.play()
        }
        background(splashimg)
    }

    playbutton.mousePressed(() => {
        gameState = "level1"
        playbutton.hide()
    })

    if (gameState == "level1") {
        // background(level1bg)
        // image(level1bg, 0, 0, width * 4, height)
        image(bg1, 0, 0, width * 4, height*1.08 )
        playbutton.hide()
        soundoffbutton.hide()
        soundonbutton.hide()
        collectibles()
        player.visible = true
        camera.x = player.x
        camera.y = player.y

         

        for(i=0;i<collectibleGroup.length;i++){
    if(collectibleGroup.get(i).isTouching(player)){
       health +=10
       collectibleGroup.get(i).destroy()
    //    gameState="over"
    }}


        if (keyDown("RIGHT_ARROW")) {
            player.x += 2
        }

        if (keyDown("LEFT_ARROW")) {
            player.x -= 2
        }


        if (keyDown("UP_ARROW")) {
            player.y -= 2
        }

        if (keyDown("DOWN_ARROW")) {
            player.y += 2
        }



if(health>=50){
    level1Won()
    collectibleGroup.destroyEach()
}


    }



    if(gameState=="Level2"){

        image(bg2, 0, 0, width * 4, height * 2)
        playbutton.hide()
        soundoffbutton.hide()
        soundonbutton.hide()
        spawnEnemies()
        player.visible = true
        camera.x = player.x
        camera.y = player.y

        for(i=0;i<enemyGroup.length;i++){
            if(enemyGroup.get(i).isTouching(player)){
               player.addImage(ballHit) 
               player.destroy()
              gameState= "end"
               
            }}


            for(i=0;i<weaponsG.length;i++){
                if(weaponsG.get(i).isTouching(enemyGroup)){
                   
                 health1 +=10
                 weaponsG.get(i).destroy()
                 enemyGroup.destroyEach()



                   
                }}


if(health1>=50)
{
    gameState="win"
}
       
            if (keyDown(RIGHT_ARROW)) {
                spawnweapon()
                weapon.x = (player.x + (player.width) / 2)
                weapon.changeImage("shoot", weaponimg)
                weapon.velocityX = 8


            }
            if (keyDown(UP_ARROW)) {
                player.y = player.y - 15
            }
            if (keyDown(DOWN_ARROW)) {
                player.y = player.y + 15
            }
            if (player.x < 0) {
                player.x = 10
            }
            if (player.x > width) {
                player.x = width - 100
            }
    
    
            if (player.y > height) {
                player.y = height - 10
            }
            if (player.y < 0) {
                player.y = 10
            }
    }


    drawSprites()

  
    

    
    if(gameState=="end"){
        gameOver()
    }

       
    if(gameState=="win"){
        gameWin()
    }

    if (gameState == "level1") {
        textSize(50)
        fill("yellow")
        stroke(255, 0, 0)
        strokeWeight(2)
        text("LEVEL 1", player.x - 100, player.y - 300)
        // healthlevel1()

        text("Health : "+health, player.x + 200, player.y - 300)

    }


    if (gameState == "Level2") {
        textSize(50)
        fill("yellow")
        stroke(255, 0, 0)
        strokeWeight(2)
        text("LEVEL 2", player.x - 100, player.y - 300)
        // healthlevel1()

        text("Health : "+health1, player.x + 200, player.y - 300)

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






function collectibles() {
    //write code here to spawn the clouds

    // if (frameCount % 10  == 0) {
    //     rand = Math.round(random(height / 4, height - 100))
    //     obstacle = createSprite(player.x+width/2, player.y)
    //     obstacle.velocityX = -2
    //     obstacle.addImage(sugar)
    //     collectibleGroup.add(obstacle)
    // }
    if (frameCount % 10 === 0) {
        rand = Math.round(random(height / 4, height - 100))
            collectible = createSprite(player.x+width/2, player.y)
        collectible.velocityX = -2
        // collectible.scale=0.5


        randimg= Math.round(random(1,2))

        switch(randimg){
            case 1: collectible.addImage(cd)
            break;

            case 2: collectible.addImage(floppy)
            break;
            

        }

        //adding cloud to the group
        collectibleGroup.add(collectible);
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
            if (isConfirm) {
                gameState = "Level2"
            }
        }
    )
}


function spawnweapon() {
   
    weapon = createSprite(player.x + (player.width) / 2, player.y)
    weapon.addImage("shoot", weaponimg)

    //weapon.visible=false 
    weapon.velocityX = 8
    weaponsG.add(weapon)

    // console.log("hit")

}



function spawnEnemies() {
    //write code here to spawn the clouds
    if (frameCount % 120 === 0) {
        rand = Math.round(random(height / 4, height - 100))
            enemy = createSprite(width*1.5, rand)
        enemy.velocityX = -2
        
        enemy.debug=true
        enemy.setCollider("circle",0,0,40)


        randimg= Math.round(random(1,3))

        switch(randimg){
            case 1: enemy.addImage(virus1)
            enemy.scale=0.15
            break;

            case 2: enemy.addImage(virus2)
            enemy.scale=0.5
            break;

            case 3: enemy.addImage(virus3)
            enemy.scale=0.75
            break;
            
            default:break;
            

        }

        //adding cloud to the group
        enemyGroup.add(enemy);
    }
}



function gameOver(){
    player.destroy()
    collectibleGroup.destroyEach()
    enemyGroup.destroyEach()
    enemyGroup.setVelocityEach(0)
    background.velocityX = 0
    health=0
    health1=0
    swal(
        {

            title: `You have been ELIMINATED`,
            text: "Regain you Energy!!!",
            imageUrl: "assets/key.gif",
            imageSize: "250x250",
            confirmButtonText: "RETRY",
            confirmButtonColor: "cyan"
        },
        function () {

            window.location.reload();
        }
    )
   


}


function gameWin() {
    player.destroy()
    health=0
    health1=0
    collectibleGroup.destroyEach()
    enemyGroup.destroyEach()
    enemyGroup.setVelocityEach(0)
    weaponsG.destroyEach()
    weaponsG.setVelocityEach(0)
    background.velocityX = 0
    swal(
        {

            title: `You WON!!!`,
            text: "Get back to the Misson Again",
            imageUrl: "assets/smiling cd.gif",
            imageSize: "200x200",
            confirmButtonText: "Restart",
            confirmButtonColor: "cyan"
        },
        function () {

            window.location.reload();
        }

    )
}
