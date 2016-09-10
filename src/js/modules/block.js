import * as Transforms from './transforms';

const areCoordinates = (coordinates) =>
    Array.isArray(coordinates)
    && coordinates.every((coord) =>
        Array.isArray(coord)
        && coord.every(Number.isInteger));

export function Block(playerIndex, coordinates = []) {
    if (!Number.isInteger(playerIndex) || playerIndex < 0) {
        throw new TypeError(`invalid player index: ${playerIndex}`);
    }
    if (!areCoordinates(coordinates)) {
        throw new TypeError(`invalid coordinates: ${coordinates}`);
    }
    this.playerIndex = playerIndex;
    this.coordinates = coordinates;
}

Block.prototype.rotateCW = function() {
    this.coordinates = this.coordinates.map(Transforms.rotateCW);
};

Block.prototype.rotateCCW = function() {
    this.coordinates = this.coordinates.map(Transforms.rotateCCW);
};

Block.prototype.reflectX = function() {
    this.coordinates = this.coordinates.map(Transforms.reflectX);
};

Block.prototype.reflectY = function() {
    this.coordinates = this.coordinates.map(Transforms.reflectY);
};

Block.prototype.getContextualCoordinates = function(tpl) {
    return this.coordinates.map((coord) =>
        [ coord[0] + tpl[0], coord[1] + tpl[1] ]);
};
