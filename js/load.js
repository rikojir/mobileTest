var loadState = {
    
    preload : function() {
        /* Add a loading label on the screen */
        var loadingLabel = game.add.text(game.world.centerX, 150, 'loading ...', {font: '30px Arial', fill: '#ffffff'});
        loadingLabel.anchor.setTo(0.5, 0.5);
        
        /* Display the progress bar */
        var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
        
        /* Load all our assets */
        
        /* Load the player as a spritesheet for later animation */
        game.load.spritesheet('player', 'assets/player2.png', 20, 20);
      
        game.load.image('level1', 'assets/level1.png');
        game.load.image('level2', 'assets/level2.png');
        game.load.image('level3', 'assets/level3.png');
        game.load.image('level4', 'assets/level4.png');
        game.load.image('level5', 'assets/level5.png');
        
        
        game.load.image('tileset', 'assets/tileset.png');
        game.load.tilemap('map1', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map2', 'assets/map2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map3', 'assets/map3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map4', 'assets/map4.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map5', 'assets/map5.json', null, Phaser.Tilemap.TILED_JSON);
      
        game.load.image('playButton', 'assets/playButton.png');
        game.load.spritesheet('muteButton', 'assets/muteButton.png', 28, 22);
        game.load.image('pixel', 'assets/pixel.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('background', 'assets/background.png');
        /* Sound when the player jumps */
        game.load.audio('jump', [ 'assets/jump.ogg', 'assets/jump.mp3' ]);
        /* Sound when the player takes a coin */
        game.load.audio('coin', [ 'assets/coin.ogg', 'assets/coin.mp3' ]);
        /* Sound when the player dies */
        game.load.audio('dead', [ 'assets/dead.ogg', 'assets/dead.mp3' ]);
        game.load.image('jumpButton', 'assets/jumpButton.png');
        game.load.image('rightButton', 'assets/rightButton.png');
        game.load.image('leftButton', 'assets/leftButton.png');
    },
    
    create : function() {
        /* Go to the menu state */
        game.state.start('menu');
    },
  
    scaleAsset : function(asset) {
        asset.scale.setTo(scaleRatio, scaleRatio);
    }
}