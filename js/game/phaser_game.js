var PhaserGame = {

  mode: null,
  airconsole: null,
  teams: null,
  phaser: null,
  map: null,
  objects: {},
  layer: null,

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
    this.phaser.load.image('floor_default', 'assets/images/game/floor_tile.png');
    this.phaser.load.image('floor_tile_32', 'assets/images/game/floor_tile_32.png');
    this.phaser.load.tilemap('map', 'assets/levels/level_1.json', null, Phaser.Tilemap.TILED_JSON);
  },

  create: function () {

    map = this.phaser.add.tilemap('map');
    map.addTilesetImage('floor_default');
    map.addTilesetImage('floor_tile_32');

    map.setCollisionBetween(1, 12);

    this.layer = map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();

    this.map = map;

    this.phaser.physics.startSystem(Phaser.Physics.ARCADE);
    this.phaser.physics.arcade.gravity.y = 250;
    console.log(map)
    var width = Math.max(map.widthInPixels, window.innerWidth);
    var height = Math.max(map.heightInPixels, window.innerHeight);

    var scale_manager = new Phaser.ScaleManager(this.phaser, width, height);
    scale_manager.scaleMode = Phaser.ScaleManager.RESIZE;
    scale_manager.pageAlignVertically = true;
    scale_manager.pageAlignHorizontally = true;
    scale_manager.refresh();
    this.layer.resizeWorld();

    this.buildPlayers();
  },

  update: function () {
    this.phaser.physics.arcade.collide(this.objects['unit'], this.layer, function(sprite_a, sprite_b) {
      sprite_a.collidesWith(sprite_b);
      //console.log(sprite_a.body.velocity, sprite_b);
    });
  },

  render: function () {
    this.phaser.debug.body(this.objects['unit'][0]);
  },

  // =====================================================================================
  // PLAYERS
  // =====================================================================================

  buildPlayers: function() {
    var teams = this.teams;
    this.objects['unit'] = [];
    for (var i = 0; i < this.teams.length; i++) {
      var players = this.teams[i].players;
      for (var p = 0; p < players.length; p++) {
        var player = players[p];
        var opts = {
          color: player.color,
          label: player.name
        };
        var unit = new Unit(p, this.phaser, opts);
        player.unit = unit;
        this.objects['unit'].push(unit);
      }
    }
    console.log(this.objects['unit'])
  },

  onPlayerLeft: function(player, params) {

  },

  onPlayerInput: function(player, params) {
    //console.info("Ctrl input", player, params);
    if (player.unit) {
      if (params.action === "jump") {
        player.unit.jump(true);
      } else if (params.action === "fall") {
        player.unit.jump(false);
      }
    }
  }
};
