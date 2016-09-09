import { strictEqual, deepEqual, throws, ok } from 'assert';
import { Block } from '../src/js/modules/block';

describe('blocks', () => {
    describe('constructor', () => {
        it('throws with bad input', () => {
            throws(() => new Block());
            throws(() => new Block('derp'));
            throws(() => new Block({}));
            throws(() => new Block(-1));
        });
        it('is okay with good input', () => {
            ok(new Block(0));
            ok(new Block(5));
        });
        it('is constructed with the right properties', () => {
            const b = new Block(3);
            strictEqual(Object.keys(b).length, 2);
            deepEqual(b.coordinates, []);
            strictEqual(b.id, 3);
        });
    });
    describe('context-full-coordinates', () => {
        it('provides the properly transformed coordinates', () => {
            const coords = [ [ 0, 0 ], [ -1, 0 ], [ 1, 0 ]];
            const b = new Block(0);
            b.coordinates = coords;
            deepEqual(
                b.getContextualCoordinates([ 1, 1 ]),
                [ [ 1, 1 ], [ 0, 1 ], [ 2, 1 ] ]
            );
        });
    });
});
