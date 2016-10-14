export function Board(size) {
    if (!Number.isInteger(size) || size < 0 ) {
        throw new TypeError(`invalid board size: ${size}`);
    }
    this._hasPlayed = new Array();
    this._initBoard(size);
}

Board.prototype._initBoard = function(size) {
    this._size = size;
    this._squares = new Map();
    const startingPlacements = [
        [-1, -1],
        [size, size],
        [-1, size],
        [size, -1]
    ];
    [ 0, 1, 2, 3 ].forEach((playerIndex) => this._addSquare(startingPlacements[playerIndex], playerIndex));
}

Board.prototype.place = function(block, location) {
    const coordinates = block.getContextualCoordinates(location);
    this._validatePlacement(coordinates, block.playerIndex);
    coordinates.forEach((coord) => this._addSquare(coord, block.playerIndex));
};

Board.prototype.getSize = function() {
    return this._size;
};

Board.prototype._validatePlacement = function(coordinates, playerIndex) {
    coordinates.forEach(([ x, y ]) => {
        if ([ x, y ].some((c) => this._isOffBoard(c))) {
            throw TypeError(`block is placed off the board at [${x}, ${y}]`);
        }
        if (this._squares.has(x) && this._squares.get(x).has(y)) {
            throw TypeError(`block already placed at [${x}, ${y}]`);
        }
        if (this._samePlayer(x, y, playerIndex, adjacentSquares)) {
            throw TypeError(`block placed adjacent to same player [${x}, ${y}]`);
        }
    });
    if  (!coordinates.some(([ x, y ]) => this._samePlayer(x, y, playerIndex, adjacentCorners))) {
        throw TypeError(`block disconnected from other blocks ${coordinates}`);
    }
};

Board.prototype._addSquare = function(coordinates, playerIndex) {
    const [ x, y ] = coordinates;
    let col = this._squares.get(x);
    if (col === undefined) {
        col = this._squares.set(x, new Map()).get(x);
    }
    col.set(y, playerIndex);
    this._hasPlayed[playerIndex] = true;
}

Board.prototype._isOffBoard = function(coordinate) {
    return coordinate < 0 || coordinate >= this.getSize();
}

Board.prototype._samePlayer = function(x, y, playerIndex, squareGetter) {
    return squareGetter(x, y)
        .some(([_x, _y]) => this._getSquare(_x, _y) === playerIndex);
}

Board.prototype._getSquare = function(x, y) {
    return this._squares.get(x) && this._squares.get(x).get(y);
}

function adjacentSquares(x, y) {
    return [
        [ x - 1, y ],
        [ x + 1, y ],
        [ x, y + 1 ],
        [ x, y - 1 ]
    ];
}

function adjacentCorners(x, y) {
    return [
        [ x - 1, y - 1],
        [ x + 1, y - 1],
        [ x - 1, y + 1],
        [ x + 1, y + 1]
    ];
}
