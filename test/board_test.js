import { Board } from '../src/js/modules/board';
import { Block } from '../src/js/modules/block';
import { strictEqual, throws } from 'assert';

describe('game board', function() {
    describe('space', function() {
        it('can be any size', function() {
            let board = new Board(20);
            strictEqual(board._squares.length, 20);
            board = new Board(0);
            strictEqual(board._squares.length, 0);
        });
        it('excepts on invalid input', function() {
            throws(() => new Board());
            throws(() => new Board(Infinity));
            throws(() => new Board('aaaay'));
            throws(() => new Board({}));
            throws(() => new Board(null));
            throws(() => new Board(undefined));
        });
    });
    describe('placing a block', function() {
        let board;
        let block;
        beforeEach(function() {
            board = new Board(20);
            block = new Block(0, [ [ 0, 0 ] ]);
        });

        it('ensures a user\'s first block is played in that user\'s corner', function() {
            let loc = Math.floor(Math.random() * 19) + 1;
            throws(() => board.place(block, [ loc, loc ]));
            board = new Board(20);
            board.place(block, [ 0, 0 ]);
            let p2Block = new Block(1, [ [ 0, 0 ] ]);
            board.place(p2Block, [ 19, 19 ]);
            board = new Board(20);
            throws(() => board.place(block, [ 5, 5 ]));
        });
        it('ensures a non-first block is played such that it doesn\'t overlap other blocks', function() {
            board.place(block, [ 0, 0 ]);
            throws(() => board.place(block, [ 0, 0 ]));
            board.place(block, [ 1, 1 ]);
            throws(() => board.place(block, [ 1, 1 ]));
        });
        it('ensures a non-first block is played such that it does not have touching edges with this user\'s other blocks', function() {
            board.place(block, [ 0, 0 ]);
            throws(() => board.place(block, [ 0, 1 ]));
            throws(() => board.place(block, [ 1, 0 ]));
        });
        it('allows blocks to be placed that do not violate above rules', function() {
            board.place(block, [ 0, 0 ]);
            board.place(block, [ 1, 1 ]);
            board.place(block, [ 2, 2 ]);
            board.place(block, [ 0, 2 ]);
            board.place(block, [ 2, 0 ]);
        });
        it('does not allow blocks placed outside the board', function() {
            throws(() => board.place(block, [ -1, 0 ]));
            throws(() => board.place(block, [ 0, -1 ]));
            throws(() => board.place(block, [ 20, 0 ]));
            throws(() => board.place(block, [ 0, 20 ]));
        });
    });
});
