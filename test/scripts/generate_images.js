import {
    imageDataToPNG,
    toImageData
} from 'imagediff';
import {
    BoardDrawerTestRunner,
    tasks
} from './board_drawer_setup';

const OUTPUT_DIR = 'test/data/img/';

Object.keys(tasks).forEach((task) => {
    const runner = new BoardDrawerTestRunner();
    runner.run(task);
    imageDataToPNG(toImageData(runner.getCanvas()), `${OUTPUT_DIR}${task}.png`);
});
