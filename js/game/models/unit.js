Unit = function (index, game, opts) {
  opts = opts || {};
  var x = opts.x || game.world.randomX;
  var y = opts.y || game.world.randomY;
  var color = opts.color || 0x00ff00;
  this.game = game;
  this.radius = 60;

  var graphics = game.make.graphics(x, y);
  graphics.lineStyle(2, color, 1);
  graphics.drawCircle(0, 0, this.radius);
  var texture = graphics.generateTexture();

  this.gravity_fall = 600;
  this.gravity_up = -250;

  Phaser.Sprite.call(this, game, x, y, texture);

  this.anchor.setTo(0.5, 0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.gravity.y = 600;
  this.body.maxVelocity = 1;
  this.body.immovable = false;
  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(0.2, 0.2);

  game.add.existing(this);
};

Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.update = function() {
};

Unit.prototype.jump = function(is_up) {
  gravity = (is_up) ? this.gravity_up : this.gravity_fall;
  this.body.gravity.y = gravity;
};
