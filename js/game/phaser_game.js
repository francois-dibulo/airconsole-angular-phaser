var PhaserGame = {

  mode: null,
  airconsole: null,
  teams: null,
  phaser: null,

  init: function(airconsole, teams, mode) {
    this.airconsole = airconsole;
    this.teams = teams;
    this.mode = mode;
    this.phaser = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-container', {
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
    this.phaser.physics.startSystem(Phaser.Physics.ARCADE);
    //this.phaser.physics.arcade.gravity.y = 100;

    // Scale
    var scale_manager = new Phaser.ScaleManager(this.phaser, window.innerWidth, window.innerHeight);
    scale_manager.scaleMode = Phaser.ScaleManager.RESIZE;
    scale_manager.pageAlignVertically = true;
    scale_manager.pageAlignHorizontally = true;
    scale_manager.refresh();

    this.buildPlayers();
  },

  update: function () {

  },

  render: function () {

  },

  // =====================================================================================
  // PLAYERS
  // =====================================================================================

  buildPlayers: function() {
    var teams = this.teams;
    for (var i = 0; i < this.teams.length; i++) {
      var players = this.teams[i].players;
      for (var p = 0; p < players.length; p++) {
        var player = players[p];
        var opts = {
          color: player.color,
          label: player.name
        };
        player.unit = new Unit(p, this.phaser, opts);
      }
    }
  },

  onPlayerLeft: function(player, params) {

  },

  onPlayerInput: function(player, params) {
    console.info("Ctrl input", player, params);
    if (player.unit) {
      if (params.action === "jump") {
        player.unit.jump(true);
      } else if (params.action === "fall") {
        player.unit.jump(false);
      }
    }
  }
};
