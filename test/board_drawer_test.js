import imagediff from 'imagediff';
import { Board } from '../src/js/modules/board';
import { Block } from '../src/js/modules/block';
import { BoardDrawer } from '../src/js/modules/board_drawer';
import { Image } from 'canvas';
import { ok } from 'assert';
import { readFile } from 'fs';

function compareWithValidImage(imgLocation, testCanvas, done) {
    const validImage = new Image();
    readFile(imgLocation, onRead);

    function onRead(err, validImgData) {
        validImage.src = validImgData;
        ok(imagediff.equal(testCanvas, validImage));
        done();
    }
}

describe('board drawer', function() {
    beforeEach(function() {
        this.testCanvas = imagediff.createCanvas(100, 100);
        this.board = new Board(20);
        this.drawer = new BoardDrawer(this.testCanvas);
        this.block = new Block(0, [ [ 0, 0 ] ]);
    });
    afterEach(function() {
        delete this.testCanvas;
    });
    it('draws an initial empty board with lines, given a board object', function(done) {
        this.drawer.draw(this.board);
        compareWithValidImage('test/data/img/board_empty.jpg', this.testCanvas, done);
    });
    it('draws blocks on the board based on a board object\'s state', function(done) {
        this.board.place(this.block, [ 0, 0 ]);
        this.drawer.draw(this.board);
        compareWithValidImage('test/data/img/board_with_block_1.jpg', this.testCanvas, done);
        this.board.place(this.block, [ 1, 1 ]);
        this.drawer.draw(this.board);
        compareWithValidImage('test/data/img/board_with_block_2.jpg', this.testCanvas, done);
    });
});
