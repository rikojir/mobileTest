var levelCompletedState = {
  preload: function () {
    
  },
  
  create: function () {
    var winLabel = game.add.text(game.world.centerX, -50, 'level completed!', {font: '50px Geo', fill: '#ffffff'});
    winLabel.anchor.setTo(0.5, 0.5);
    
    // Tween for falling down
    var fallDownTween = game.add.tween(winLabel).to({x: game.world.centerX, y: game.world.centerY}, 750).easing(Phaser.Easing.Bounce.Out).start();
    // Fire emitter in 750 ms
    
    //tween.onComplete.add(this.fireEmitter, this);
    //fallDownTween.onComplete.add(function() { game.add.tween(winLabel).to( { angle: 359 }, 1000, Phaser.Easing.Linear.None, true)}, this);
    game.time.events.add(300, this.fireEmitter, this);
    // Tween for rotating
    game.add.tween(winLabel).to({angle: -3}, 500).to({angle: 0}, 500).to({angle: 3}, 500).to({angle: 0}, 500).loop().start();
    
    //Add three emitters at a little above center and left and right
    this.emitterUp = game.add.emitter(game.world.centerX, game.world.centerY + 30, 75);
    this.emitterLeft = game.add.emitter(game.world.centerX - 50, game.world.centerY - 15, 75);
    this.emitterRight = game.add.emitter(game.world.centerX + 50, game.world.centerY - 20, 75);
    //Use the pixel.png image as a particle
    this.emitterUp.makeParticles('pixel');
    this.emitterLeft.makeParticles('pixel');
    this.emitterRight.makeParticles('pixel');
    //When firing, choose random x/y speed between -150 and 150
    this.emitterUp.setYSpeed(-150, 150);
    this.emitterUp.setXSpeed(-150, 150);
    this.emitterRight.setYSpeed(-150, 150);
    this.emitterRight.setXSpeed(-150, 150);
    this.emitterLeft.setYSpeed(-150, 150);
    this.emitterLeft.setXSpeed(-150, 150);
    //No gravity for pixels, otherwise the pixels will fall down
    this.emitterUp.gravity = 0;
    this.emitterLeft.gravity = 0;
    this.emitterRight.gravity = 0;
    
    game.add.tween(winLabel).to( { angle: 359 }, 1000, Phaser.Easing.Linear.None, true);
    // Wait 3 seconds and return back to level selection
    game.time.events.add(3000, this.backToLevelSelection, this);
    
  },
  
  backToLevelSelection: function() {
    game.state.start('levelSelection');
  },
  
  fireEmitter: function() {
    this.emitterUp.start(true, 900, null, 90);
    this.emitterRight.start(true, 1000, null, 90);
    this.emitterLeft.start(true, 1100, null, 90);
  }
}