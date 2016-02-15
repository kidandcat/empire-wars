var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var sprite;


function preload() {
    game.load.image('sky', 'img/1.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    sprite = game.add.sprite(0, 0, 'sky');
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
}

function update() {
    if (game.input.mousePointer.isDown) {
        sprite.myx = game.input.mousePointer.clientX;
        sprite.myy = game.input.mousePointer.clientY;
        game.physics.arcade.moveToXY(sprite, sprite.myx, sprite.myy, 300);
        console.log(game.input.mousePointer.clientX);
    }

    if ((Math.round(sprite.body.x) < sprite.myx + 5 && Math.round(sprite.body.x) > sprite.myx - 5) && (Math.round(sprite.body.y) < sprite.myy + 5 && Math.round(sprite.body.y) > sprite.myy - 5)) {
        console.log('stop');
        sprite.body.velocity.setTo(0, 0);
    }
}