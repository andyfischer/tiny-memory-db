
import { Step } from '../Step'

function prepare(step: Step) {
    step.put({ count: null });
}

function run(step: Step) {
    let count = 0;

    step.input.sendTo({
        receive(data) {
            switch (data.t) {

            case 'done':
                step.output.put({ count });
                step.output.done();
                break;

            case 'item':
                count++;
                break;

            default:
                step.output.receive(data);
            }
        }
    })
}

export const count = {
    prepare,
    run
}
