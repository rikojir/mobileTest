var portraitState = {

  preload: function() {
  
  },
  
  create: function() {
    
  },
  
  update: function() {
    console.log("hi");
    if (game.scale.isPortrait == false) {
      console.log("in");
      game.state.start('load');
    }
  },
  
  handleIncorrect: function() {
    if (!game.device.desktop) {
      document.getElementById('turn').style.display="block";
    }
  },
  
  handleCorrect: function() {
    if(!game.device.desktop) {
      document.getElementById('turn').style.display="none";
    }
  }
}