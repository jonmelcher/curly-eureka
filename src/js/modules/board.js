export function Board(size) {
    if (!Number.isInteger(size) || size < 0) {
        throw new TypeError(`invalid board size: ${size}`);
    }
    this._squares = new Array(size);
    this._size = size;
    this._hasPlayed = new Array();
}

Board.prototype.place = function(block, location) {
    let coordinates = block.getContextualCoordinates(location);
    coordinates.forEach((coord) => this._validatePlacement(coord, block.playerIndex));
    coordinates.forEach((coord) => this._addSquare(coord, block.playerIndex));
};

Board.prototype._validatePlacement = function(coordinates, playerIndex) {
    const [ x, y ] = coordinates;
    if (coordinates.some((c) => this._isOffBoard(c))) {
        throw TypeError(`block is placed off the board at [${x}, ${y}]`);
    }
    if (this._squares[x] !== undefined && this._squares[x][y] !== undefined) {
        throw TypeError(`block already placed at [${x}, ${y}]`);
    }
    if (this._sameAdjacentPlayer(x, y, playerIndex)) {
        throw TypeError(`block placed adjacent to same player [${x}, ${y}]`);
    }
    if (!this._hasPlayed[playerIndex] && !this._isStartingPlacment(coordinates, playerIndex)) {
        throw TypeError(`first play by player at invalid location [${x}, ${y}]`);
    }
};

Board.prototype._addSquare = function(coordinates, playerIndex) {
    const [ x, y ] = coordinates;
    let col = this._squares[x];
    if (col === undefined) {
        col = this._squares[x] = new Array(this._size);
    }
    col[y] = playerIndex;
    this._hasPlayed[playerIndex] = true;
}

Board.prototype._isOffBoard = function(coordinate) {
    return coordinate < 0 || coordinate >= this._size;
}

Board.prototype._sameAdjacentPlayer = function(x, y, playerIndex) {
    return adjacentSquares(x, y)
        .some(([_x, _y]) => this._getSquare(_x, _y) === playerIndex);
}

Board.prototype._getSquare = function(x, y) {
    return this._squares[x] && this._squares[x][y];
}

Board.prototype._isStartingPlacment = function (coordinates, playerIndex) {
    return getStartingPlacement(this._size, playerIndex)
        .every((c, idx) => coordinates[idx] === c);
};

function adjacentSquares(x, y) {
    return [
        [ x - 1, y ],
        [ x + 1, y ],
        [ x, y + 1 ],
        [ x, y - 1 ]
    ];
}

let startingPlacements;
function getStartingPlacement(size, playerIndex) {
    if (!startingPlacements) {
        let finalXY = size - 1;
        startingPlacements = [
            [0, 0],
            [finalXY, finalXY],
            [0, finalXY],
            [finalXY, 0]
        ];
    }
    return startingPlacements[playerIndex];
}
