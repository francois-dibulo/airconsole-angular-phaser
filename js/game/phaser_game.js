var PhaserGame = {

  airconsole: null,
  teams: null,
  phaser: null,

  init: function(airconsole, teams) {
    this.airconsole = airconsole;
    this.teams = teams;
    this.phaser = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-container', {
      preload: this.preload.bind(this),
      create: this.create.bind(this),
      update: this.update.bind(this),
      render: this.render.bind(this)
    });
  },

  destroy: function() {
    this.phaser.destroy();
    this.phaser = null;
  },

  preload: function () {
    // this.phaser.load.image('logo', 'assets/game/logo.png');
  },

  create: function () {
    this.phaser.world.setBounds(0, 0, 1000, 1000);

    // Scale
    var scale_manager = new Phaser.ScaleManager(this.phaser, 1000, 1000);
    scale_manager.scaleMode = Phaser.ScaleManager.RESIZE;
    scale_manager.pageAlignVertically = true;
    scale_manager.pageAlignHorizontally = true;
    scale_manager.refresh();
  },

  update: function () {

  },

  render: function () {

  },

  onPlayerLeft: function(player, params) {

  },

  onPlayerInput: function(player, params) {
    console.info("Ctrl input", player, params);
  }
};
