var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var soldier1, soldier2;
var selected = [];
var SPEED = 150;
var soldier;

function preload() {
    game.load.image('soldier', 'img/soldier.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.input.onDown.add(function () {
        if (selected.length > 0 && game.input.mousePointer.button == 0) {
            console.log('unselected');
            selected.forEach(function (e) {
                e.unselect();
            });
        }
    }, this);

    soldier = new Unit_soldier(20, 20);
}

function update() {
    soldier.update();
}





// CLASS Soldier

function Unit_soldier(x, y) {
    var soldiers = [];
    this.sprite = game.add.sprite(0.5, 0.5, 'soldier');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    soldiers.push(this);
    //selectable
    this.sprite.body.x = x;
    this.sprite.body.y = y;
    this.sprite.inputEnabled = true;
    this.sprite.input.useHandCursor = true;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.selected = false;

    this.sprite.events.onInputDown.add(this.select, this);
}

Unit_soldier.prototype.select = function (sprite, event) {
    if (event.button == 0) {
        selected.push(this);
        this.selected = true;
        this.sprite.circle = new Phaser.Circle(0, 0, 64);
        this.sprite.graphics = game.add.graphics(0, 0);
        this.sprite.graphics.lineStyle(1, 0x00ff00, 1);
        this.sprite.graphics.drawCircle(16, 16, sprite.circle.diameter);
    }
}

Unit_soldier.prototype.unselect = function () {
    this.sprite.graphics.destroy();
    this.selected = false;
}

Unit_soldier.prototype.update = function () {
    if (this.selected) {
        this.sprite.graphics.position.x = this.sprite.body.x;
        this.sprite.graphics.position.y = this.sprite.body.y;
    }

    if (game.input.mousePointer.isDown) {
        if (this.selected && game.input.mousePointer.button == 2) {
            this.face = new Phaser.Point();
            this.face.x = game.input.x;
            this.face.y = game.input.y;
            this.sprite.rotation = game.physics.arcade.angleBetween(this.sprite, this.face);
            game.physics.arcade.moveToXY(this.sprite, this.face.x, this.face.y, SPEED, 0);
        }
    }

    if ((this.selected || (this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0)) && this.face) {

        this.sprite.rotation = game.physics.arcade.angleBetween(this.sprite, this.face);
        game.physics.arcade.moveToXY(this.sprite, this.face.x, this.face.y, SPEED, 0);

        if (Math.round(this.sprite.body.x) - 10 < this.face.x + 10 && Math.round(this.sprite.body.x) + 10 > this.face.x - 10) {
            if (Math.round(this.sprite.body.y) - 10 < this.face.y + 10 && Math.round(this.sprite.body.y) + 10 > this.face.y - 10) {
                this.sprite.body.velocity.setTo(0, 0);
            }
        }
    }
}