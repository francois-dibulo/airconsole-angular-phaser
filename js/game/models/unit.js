Unit = function (index, game, opts) {
  opts = opts || {};
  var x = opts.x || game.world.randomX;
  var y = opts.y || game.world.randomY;
  var color = opts.color || "#00ff00";
  var dec_color = parseInt(color.substr(1), 16);
  this.game = game;
  this.radius = 60;

  var graphics = game.make.graphics(x, y);
  graphics.lineStyle(2, dec_color, 1);
  graphics.drawCircle(0, 0, this.radius);
  var texture = graphics.generateTexture();

  this.gravity_fall = -100;
  this.gravity_up = -400;

  Phaser.Sprite.call(this, game, x, y, texture);

  this.anchor.setTo(0.5, 0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.gravity.y = this.gravity_fall;
  this.body.maxVelocity = 1;
  this.body.immovable = false;
  this.body.collideWorldBounds = true;
  this.body.bounce.setTo(0.2, 0.2);
  this.body.tilePadding.set(32);

  game.add.existing(this);

  //var style = { font: "22px Courier", fill: color };
  //this.text1 = game.add.text(0, 0, opts.label || "Player", style);

};

Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.update = function() {
  //this.text1.alignTo(this, Phaser.CENTER_TOP, 16);
};

Unit.prototype.collidesWith = function(other) {
  if (other.properties.type === "floor" && this.body.velocity.y < -100) {
    console.log("BAMM")
  }
};

Unit.prototype.jump = function(is_up) {
  var gravity = (is_up) ? this.gravity_up : this.gravity_fall;
  this.body.gravity.y = gravity;
};
