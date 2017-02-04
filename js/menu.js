var menuState = {
    
    create: function () {
        game.scale.enterIncorrectOrientation.bindings = [];
        game.scale.leaveIncorrectOrientation.bindings = [];

          
      
      
        // Add a background image game.add.image(0, 0, 'background');
        // Display the name of the game
        var nameLabel = game.add.text(game.world.centerX, 80, 'Super Coin Box', {
            font: '50px Arial'
            , fill: '#ffffff'
        });
        nameLabel.anchor.setTo(0.5, 0.5);
    
        // Show the score at the center of the screen
        var scoreLabel = game.add.text(game.world.centerX, game.world.centerY, 'score: ' + game.global.score, {font: '25px Arial', fill: '#ffffff'});

        scoreLabel.anchor.setTo(0.5, 0.5);
      
        // Store the relevant text based on the device used
        if (game.device.desktop) {
          var text = 'press up the arrow key to start';
        }
        else {
          var text = 'touch the screen to start';
        }

        // Explain how to start the game
        var startLabel = game.add.text(game.world.centerX, game.world.height - 80, text, {font: '25px Arial', fill: '#ffffff'});
        startLabel.anchor.setTo(0.5, 0.5);
      
        // Create a new Phaser keyboard variable: the up arrow key
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
      
        // Create TouchControl
        // Start game when screen is //touched
        game.input.onDown.addOnce(this.start, this);
      
        // When the 'upKey' is pressed, it will call the 'start' function once
        upKey.onDown.addOnce(this.start, this);
    }, 
    
    start: function () {
        //Start the actual game 
        game.state.start('play');
    }
};