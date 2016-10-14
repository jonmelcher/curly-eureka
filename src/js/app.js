import '../../node_modules/babel-polyfill/dist/polyfill';
import { BoardDrawer } from './modules/board_drawer';
import { Board } from './modules/board';

const canvas = document.querySelector('.js-board');
const board = new Board(20);
const drawer = new BoardDrawer(canvas, board);

drawer.draw();
