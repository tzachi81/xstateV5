import { createActor } from 'xstate';
import { tasksMachine } from './tasks.machine';
import { createBrowserInspector } from '@statelyai/inspect';

const { inspect } = createBrowserInspector({
    filter: (inspEvent) => {
        if (inspEvent.type === '@xstate.event') {
            // Skip mouse drag events
            return inspEvent.event.type !== 'mouse.drag';
        }
        return true;
    },
});

export const tasksActor = createActor(tasksMachine, {inspect});

export const tasksActorActions = {
    CURRENT_STATE: () => tasksActor.getSnapshot().value,
    TOGGLE: () => tasksActor.send({ type: 'TOGGLE' }),
    ADD_TASK: (params: any) => {
        params && tasksActor.send({type: 'ADD_TASK', data: params}) ;
    },
    REMOVE_TASK: (params: any) => {
        params && tasksActor.send({type: 'REMOVE_TASK', data: params}) ;
    }
}

tasksActor.subscribe((snapshot) => console.log(`Context: ${JSON.stringify(snapshot.context)}`));
tasksActor.start();



