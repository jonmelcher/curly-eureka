import { BoardDrawerTestRunner } from '../scripts/board_drawer_setup';
import { equal } from 'imagediff';
import { Image } from 'canvas';
import { ok } from 'assert';
import { readFile } from 'fs';

describe('board drawer', function() {
    beforeEach(function() {
        this.runner = new BoardDrawerTestRunner();
    });
    afterEach(function() {
        delete this.runner;
    });
    it('draws an initial empty board with lines, given a board object', function(done) {
        runTest.call(this, 'board_empty', done);
    });
    it('draws a single block', function(done) {
        runTest.call(this, 'board_1_block', done);
    });
    it('draws multiple blocks', function(done) {
        runTest.call(this, 'board_2_blocks', done);
    });
});

function runTest(key, done) {
    this.runner.run(key);
    compareWithValidImage(`test/data/img/${key}.png`, this.runner.getCanvas(), done);
}

function compareWithValidImage(imgLocation, testCanvas, done) {
    const validImage = new Image();
    readFile(imgLocation, onRead);

    function onRead(err, validImgData) {
        validImage.src = validImgData;
        ok(equal(testCanvas, validImage));
        done();
    }
}
