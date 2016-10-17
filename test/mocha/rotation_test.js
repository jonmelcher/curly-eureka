import { deepEqual } from 'assert';
import { reflectX, reflectY, rotateCW, rotateCCW } from '../../src/js/modules/transforms';

describe('block rotations', () => {
    describe('zero vector', () => {
        const zeroVector = [ 0, 0 ];
        it('is unaffected by cw rotation', () => {
            deepEqual(rotateCW(zeroVector), zeroVector);
        });
        it('is unaffected by ccw rotation', () => {
            deepEqual(rotateCCW(zeroVector), zeroVector);
        });
        it('is unaffected by reflection on the x-axis', () => {
            deepEqual(reflectY(zeroVector), zeroVector);
        });
        it('is unaffected by reflection on the y-axis', () => {
            deepEqual(reflectX(zeroVector), zeroVector);
        });
    });
    describe('reflection on x-axis', () => {
        it('should not affect a vector on the x-axis', () => {
            const xAxisVector = [ 4, 0 ];
            deepEqual(reflectY(xAxisVector), xAxisVector);
        });
        it('should affect a vector not on the x-axis', () => {
            const vector = [ -34, 43 ];
            deepEqual(reflectY(vector), [ -34, -43 ]);
        });
        it('should do nothing if applied an even number of times', () => {
            const vector = [ -34, 43 ];
            deepEqual(reflectY(reflectY(vector)), vector);
        });
    });
    describe('reflection on y-axis', () => {
        it('should not affect a vector on the y-axis', () => {
            const yAxisVector = [ 0, 6 ];
            deepEqual(reflectX(yAxisVector), yAxisVector);
        });
        it('should affect a vector not on the y-axis', () => {
            const vector = [ -34, 43 ];
            deepEqual(reflectX(vector), [ 34, 43 ]);
        });
        it('should do nothing if applied an even number of times', () => {
            const vector = [ -34, 43 ];
            deepEqual(reflectX(reflectX(vector)), vector);
        });
    });
    describe('clockwise rotation', () => {
        it('should yield the correct value', () => {
            const vector = [ 1, 0 ];
            deepEqual(rotateCW(vector), [ 0, -1 ]);
        });
        it('should do nothing if applied in multiples of four', () => {
            const vector = [ 1, 0 ];
            deepEqual(rotateCW(rotateCW(rotateCW(rotateCW(vector)))), vector);
        });
    });
    describe('counter-clockwise rotation', () => {
        it('should yield the correct value', () => {
            const vector = [ 1, 0 ];
            deepEqual(rotateCCW(vector), [ 0, 1 ]);
        });
        it('should do nothing if applied in multiples of four', () => {
            const vector = [ 1, 0 ];
            deepEqual(rotateCCW(rotateCCW(rotateCCW(rotateCCW(vector)))), vector);
        });
    });
    describe('rotation combinations', () => {
        it('should do nothing if opposite rotations are applied in any order', () => {
            const vector = [ 1, 0 ];
            deepEqual(rotateCW(rotateCCW(vector)), vector);
            deepEqual(rotateCCW(rotateCW(vector)), vector);
        });
    });
});
