Unit = function (index, game, opts) {
  opts = opts || {};
  var x = opts.x || game.world.randomX;
  var y = opts.y || game.world.randomY;

  this.game = game;

  var graphics = game.make.graphics(x, y);
  graphics.lineStyle(2, this.border_color, 1);
  graphics.drawCircle(0, 0, this.radius);
  var texture = graphics.generateTexture();

  Phaser.Sprite.call(this, game, x, y, texture);

  this.anchor.setTo(0.5, 0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.immovable = false;
  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(1, 1);

  game.add.existing(this);
};

Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.update = function() {
};
