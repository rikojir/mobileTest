// New name for the state
var playState = {
    
    // Removed the preload function
    create: function () {
        // Removed background color and physics system
        this.cursor = game.input.keyboard.createCursorKeys();
      
        // If the game is running on a mobile device
        if (!game.device.desktop) {
          // Display the mobile inputs
          this.addMobileInputs();
        }
        
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        //game.state.states.load.scaleAsset(this.player);
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 600;
        // Create the 'right' animation by looping the frames 1 and 2
        this.player.animations.add('right', [1, 2], 8, true);
        // Create the 'left' animation by looping the frames 3 and 4
        this.player.animations.add('left', [3, 4], 8, true);
        
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');
        //game.state.states.load.scaleAsset(this.enemies);
        
        this.coin = game.add.sprite(60, 140, 'coin');
        //game.state.states.load.scaleAsset(this.coin);
        //game.physics.arcade.enable(this.coin);
        this.coin.anchor.setTo(0.5, 0.5);
        
        this.scoreLabel = game.add.text(30, 30, 'score: 0', {font: '18px Arial', fill: '#ffffff'}); 
        // New score variable
        game.global.score = 0;
        
        this.createWorld();
        game.time.events.loop(2200, this.addEnemy, this);
        
        /* Sound */
        this.jumpSound = game.add.audio('jump');
        this.coinSound = game.add.audio('coin');
        this.deadSound = game.add.audio('dead');
        
        this.doublejump = 0;
        
    },
    
    update : function() {
        /* This function is called 60 times per second */
        /* It contains the game's logic */
        
        /* Tell Phaser that the player and the walls should collide */
        game.physics.arcade.collide(this.player, this.walls);
        
        /* Check for player movement */
        this.movePlayer();
        
        if (this.player.body.y > 340) {
            console.log("Player died. :( -> Restarting");
            this.playerDie();
        }
        
        /* Check for collisions between player and coins */
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        
        // Make the enemies and walls collide
        game.physics.arcade.collide(this.enemies, this.walls);
        // Call the 'playerDie' function when the player and an enemy overlap
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
      
        //Check for screen rotation
        if (game.scale.screenOrientation !== prevOrientation) {
          // do nothing
        }
    },
    
    /* And here we will later add some of our own functions */
    movePlayer : function() {
        
        /* If the left arrow key is pressed */
        if (this.cursor.left.isDown || this.moveLeft) {
            /* Move the player to the left */
            this.player.body.velocity.x = -200;
            this.player.animations.play('left');
        }
        
        /* If the right arrow key is pressed */
        else if (this.cursor.right.isDown || this.moveRight) {
            /* Move player to the right */
            this.player.body.velocity.x = 200;
            this.player.animations.play('right');
        }
        
        /* If neither the right or left arrow key is pressed */
        else {
            /* Stop the player */
            this.player.body.velocity.x = 0;
            this.player.frame = 0;
        }
        
        /* If the player is on the ground or in the air, means 0 or 1 , if it is higher, jumping won't work anymore */
        if (this.doublejump === 0 | this.doublejump === 1) {
            /* If the up arrow key is pressed and the player is touching the ground just jump */
            if (this.cursor.up.isDown && this.player.body.touching.down) {
                /* Play jump sound */
                this.jumpSound.play();

                /* Move the player upward (jump) */
                this.player.body.velocity.y = -340;

                /* Set doublejump counter to 1 */
                this.doublejump = 1;
                console.log(this.doublejump);
                /* IMPORTANT : Setting cursor up to false is stopping the function to head into the else-if block
                below when calling itself 60 times per second, since you press the key for a few milliseconds. By
                that, the function would execute the code in this block PLUS the code in the block below since the
                up key is still pressed when the second of the 60 iterations is executed in the update loop.
                
                Now the else-if block won't get executed until you press the key another time */
                this.cursor.up.isDown = false;
            }
            else if (this.cursor.up.isDown && !(this.player.body.touching.down)) {
                /* If the up key is pressed a second time and the player is in the air */
                console.log("doublejump");
                /* Play jump sound */
                this.jumpSound.play();

                /* Move the player upward (jump) */
                this.player.body.velocity.y = -240;

                /* Set doublejump counter to 2, means you can't jump anymore */
                this.doublejump = 2;
                console.log(this.doublejump);
            }
        }
        
        if (this.player.body.touching.down && this.doublejump > 0) {
                console.log("Reset doublejump counter");
                /* Reset doublejump counter */
                this.doublejump = 0;
                console.log(this.doublejump);
        }
    },
  
    jumpPlayer : function() {
      // If the player is touching the ground
      if (this.player.body.onFloor()) {
        // Jump with sound
        this.player.body.velocity.y = -320;
        this.jumpSound.play();
      }
    },
    
    checkForDoubleJump : function() {
        this.doubleJumpChecker = this.player.body.touching.down;
        /* Player in the air? */
        if (!(this.doubleJumpChecker) && this.doublejump === 1) {
            console.log("Player in the air");
            /* Pressed up arrow key again? */
            if (this.cursor.up.isDown) {
                console.log("doublejump");
                /* Play jump sound */
                this.jumpSound.play();

                /* Move the player upward (jump) */
                this.player.body.velocity.y = -100;

                /* Increment doublejump counter */
                this.doublejump += 1;
            }
        }
    },
    
    updateCoinPosition : function() {
        /* Store all the possible coin positions in an array */
        var coinPosition = [
            {x: 140, y: 60}, {x: 360, y: 60}, //Top row
            {x: 60, y: 140}, {x: 440, y: 140}, //Middle row
            {x: 130, y:300}, {x: 370, y: 300}
        ];
        
        /* Remove the current coin position from the array */
        /* Otherwise the coin could appear at the same spot twice in a row */
        for (var i = 0; i < coinPosition.length; i++) {
            if (coinPosition[i].x === this.coin.x) {
                coinPosition.splice(i, 1);
            }
        }
        
        /* Randomly select a position from the array */
        var newPosition = coinPosition[
            game.rnd.integerInRange(0, coinPosition.length-1)];
        
        /* Set the new position of the coin */
        this.coin.reset(newPosition.x, newPosition.y);
    },
    
    addEnemy : function() {
        /* Get the first dead enemy of the group */
        var enemy = this.enemies.getFirstDead();
        
        /* If there isn't any dead enemy, do nothing */
        if (!enemy) {
            return;
        }
        
        // Initialise the enemy
        enemy.body.gravity.y = 500;
        enemy.anchor.setTo(0.5, 1);
        enemy.reset(game.world.centerX, 0);
        var randomSign = game.rnd.integerInRange(0,10);
        var randomSign2 = Phaser.Utils.randomChoice(1, 2);
        //console.log(randomSign2);
        if (randomSign >= 5) {
            randomSign = 1;
        }
        else {
            randomSign = -1;
        }
        enemy.body.velocity.x = 100 * randomSign;
        enemy.body.bounce.x = 1;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    },
    
    // No changes
    takeCoin: function (player, coin) {
        
        /* Play coin sound */
        this.coinSound.play();
        
        // New score variable
        game.global.score += 5;
        this.scoreLabel.text = 'score: ' + game.global.score;
        this.updateCoinPosition();
    }, 
    
    // No changes
    playerDie: function () {
        
        /* Play dead sound */
        this.deadSound.play();
        
        // When the player dies, we go to the menu 
        game.state.start('menu');
    },
    
    createWorld : function() {
        /* Create a group for the walls */
        this.walls = game.add.group();
        
        /* Add Arcade physics to the whole group */
        this.walls.enableBody = true;
        
        /* Create 2 walls in the group */
        game.add.sprite(0, 0, 'wallV', 0, this.walls); 
        game.add.sprite(480, 0, 'wallV', 0, this.walls);
        game.add.sprite(300, 0, 'wallH', 0, this.walls);
        game.add.sprite(0, 0, 'wallH', 0, this.walls);
        game.add.sprite(0, 320, 'wallH', 0, this.walls);
        game.add.sprite(300, 320, 'wallH', 0, this.walls);
        game.add.sprite(-100, 160, 'wallH', 0, this.walls);
        game.add.sprite(400, 160, 'wallH', 0, this.walls);
        
        var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
        middleTop.scale.setTo(1.5, 1);
        
        var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
        middleBottom.scale.setTo(1.5, 1);
        
        /* Set all the walls to be immovable */
        this.walls.setAll('body.immovable', true);
    },
  
    addMobileInputs: function() {
      // Add the jump button
      this.jumpButton = game.add.sprite(350, 247, 'jumpButton');
      this.jumpButton.inputEnabled = true;
      this.jumpButton.events.onInputDown.add(function(){
        if (this.player.body.touching.down) {
          this.jumpSound.play();
          this.player.body.velocity.y = -320; 
        }
      }, this);
      this.jumpButton.alpha = 0.5;
      
      // Movement variables
      this.moveLeft = false;
      this.moveRight = false;
      
      // Add the move left button
      this.leftButton = game.add.sprite(50, 247, 'leftButton');
      this.leftButton.inputEnabled = true;
      this.leftButton.events.onInputOver.add(function(){this.moveLeft=true;}, this);
      this.leftButton.events.onInputOut.add(function(){this.moveLeft=false;}, this); this.leftButton.events.onInputDown.add(function(){this.moveLeft=true;}, this);
      this.leftButton.events.onInputUp.add(function(){this.moveLeft=false;}, this);
      this.leftButton.alpha = 0.5;

      // Add the move right button
      this.rightButton = game.add.sprite(130, 247, 'rightButton');
      this.rightButton.inputEnabled = true; this.rightButton.events.onInputOver.add(function(){this.moveRight=true;}, this); this.rightButton.events.onInputOut.add(function(){this.moveRight=false;}, this); this.rightButton.events.onInputDown.add(function(){this.moveRight=true;}, this); this.rightButton.events.onInputUp.add(function(){this.moveRight=false;}, this);
      this.rightButton.alpha = 0.5;
      
      
      
      this.jumpButton.events.onInputDown.add(this.jumpPlayer, this);
    },
  
};
// Removed Phaser and states initialisation