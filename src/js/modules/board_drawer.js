export const GRID_BORDER_WIDTH = 2;

export function BoardDrawer(canvas, board) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this._board = board;
    this._validateCanvas();
}

BoardDrawer.prototype.draw = function() {
    this._drawGrid();
}

BoardDrawer.prototype._drawGrid = function() {
    const offset = this._getInnerSquareSideLength() + GRID_BORDER_WIDTH;
    this._ctx.beginPath()
    this._ctx.lineWidth = GRID_BORDER_WIDTH;
    this._ctx.strokeStyle = 'black';
    for (let i = 0; i <= this._board.getSize() + 1; i++) {
        this._horizontalLine(i * offset);
        this._verticalLine(i * offset);
    }
    this._ctx.stroke();
}

/**
 * Get the inner width/height of the squares (ie. not including the stroked
 *  width)
 *
 * @return {Number}
 */
BoardDrawer.prototype._getInnerSquareSideLength = function() {
    return ((this._canvas.width - GRID_BORDER_WIDTH) / this._board.getSize()) - GRID_BORDER_WIDTH;
}

BoardDrawer.prototype._validateCanvas = function() {
    if (this._canvas.width !== this._canvas.height) {
        throw new Error('Canvas height and width must be equal');
    }
    const inner_square_side_length_decimals = this._getInnerSquareSideLength() % 1;
    if (inner_square_side_length_decimals != 0) {
        throw new Error(`The squares are not an even number of pixels wide or high [${this._getInnerSquareSideLength()}]`);
    }
}

BoardDrawer.prototype._horizontalLine = function(y) {
    y = y + GRID_BORDER_WIDTH / 2;
    this._line([0, y], [this._canvas.width, y]);
}

BoardDrawer.prototype._verticalLine = function(x) {
    x = x + GRID_BORDER_WIDTH / 2;
    this._line([x,0], [x,this._canvas.height]);
}

BoardDrawer.prototype._line = function([startX, startY], [endX, endY]) {
    this._ctx.moveTo(startX, startY);
    this._ctx.lineTo(endX, endY);
}
