var bootState = {
    
    preload: function () {
        /* Load the menu image */
        game.load.image('progressBar', 'assets/progressBar.png');
    }, 
    
    create: function () {
        /* Set some game settings */
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        /* Start the load state */
      
      
        // If the device is not a desktop, so it's a mobile device
        if (!game.device.desktop) {
          // Set the type of scaling to 'show all'
          
          game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
          // Add a blue color to the page, to hide the white borders we might have
          document.body.style.backgroundColor = '#3498db';
          // Set the min and max width/height of the game
          game.scale.minWidth = 250;
          game.scale.minHeight = 170;
          game.scale.maxWidth = 500;
          game.scale.maxHeight = 340;
          // Center the game on the screen
          game.scale.pageAlignHorizontally = true;
          game.scale.pageAlignVertically = true;
          // Apply the scale changes
          
          //WARNING: IMPORTANT CHANGE!
          game.scale.refresh();
        }
      
      
      
        game.state.start('load');
    }
}