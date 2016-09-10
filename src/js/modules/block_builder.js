import { Block } from './block';

const coordinates = [
    [ [ 0, 0 ] ],
    [ [ 0, 0 ], [ 1, 0 ] ],
    [ [ -1, 0 ], [ 0, 0 ], [ 1, 0 ] ],
    [ [ -1, 0 ], [ 0, 0 ], [ 0, -1 ] ],
    [ [ 0, 0 ], [ 1, 0 ], [ 0, -1 ], [ 1, -1 ] ],
    [ [ -1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 0 ] ],
    [ [ -1, 0 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ],
    [ [ -2, 0 ], [ -1, 0 ], [ 0, 0 ], [ 0, 1 ] ],
    [ [ -1, -1 ], [ 0, -1 ], [ 0, 0 ], [ 1, 0 ] ],
    [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ],
    [ [ -1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 0 ] ],
    [ [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ],
    [ [ -1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ] ],
    [ [ 0, -1 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ] ],
    [ [ 0, 2 ], [ 0, 1 ], [ 0, 0 ], [ 0, -1 ], [ 0, -2 ] ],
    [ [ 0, 1 ], [ 0, 0 ], [ 0, -1 ], [ 1, 0 ], [ 1, -1 ] ],
    [ [ -1, -1 ], [ -1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 1 ] ],
    [ [ 1, 1 ], [ 0, 1 ], [ 0, 0 ], [ 0, -1 ], [ 1, -1 ] ],
    [ [ -1, 0 ], [ 0, 0 ], [ 0, -1 ], [ 0, 1 ], [ 1, 1 ] ],
    [ [ -1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 0, -1 ], [ 1, 0 ] ],
    [ [ -1, 0 ], [ 0, 0 ], [ 0, 1 ], [ 1, 0 ], [ 2, 0 ] ]
];

const getStartingSet = (playerIndex) =>
    coordinates.map((coords) => new Block(playerIndex, coords));

const getIndividual = (blockIndex, playerIndex) => {
    if (blockIndex < 0 || blockIndex >= coordinates.length) {
        throw new RangeError('blockIndex is out of range');
    }
    return new Block(playerIndex, coordinates[blockIndex]);
};

export const BlockBuilder = {
    getStartingSet,
    getIndividual
};
