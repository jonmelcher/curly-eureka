import { createCanvas } from 'imagediff';
import { Board } from '../../src/js/modules/board';
import { Block } from '../../src/js/modules/block';
import { BoardDrawer, GRID_BORDER_WIDTH } from '../../src/js/modules/board_drawer';

const CANVAS_SIZE = 1000 + GRID_BORDER_WIDTH;

export function BoardDrawerTestRunner() {
    this.canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    this.board = new Board(20);
    this.drawer = new BoardDrawer(this.canvas, this.board);
}

BoardDrawerTestRunner.prototype = {
    getCanvas() {
        return this.canvas;
    },
    run(task) {
        tasks[task].call(this);
    }
};

export const tasks = {
    board_empty() {
        this.drawer.draw(this.board);
    },
    board_1_block() {
        this.board.place(new Block(0, [ [ 0, 0 ] ]), [ 0, 0 ]);
        this.drawer.draw(this.board);
    },
    board_2_blocks() {
        this.board.place(new Block(0, [ [ 0, 0 ] ]), [ 0, 0 ]);
        this.drawer.draw(this.board);
        this.board.place(new Block(0, [ [ 0, 0 ] ]), [ 1, 1 ]);
        this.drawer.draw(this.board);
    }
};
