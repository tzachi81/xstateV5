import { createActor } from 'xstate';
import { rootMachine } from './root.machine';
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

export const rootActor = createActor(rootMachine, {inspect});

export const rootActorActions = {
    CURRENT_STATE: () => rootActor.getSnapshot().value,
    TOGGLE: () => {
        rootActor.send({ type: 'TOGGLE' });
    }
}

rootActor.subscribe((snapshot) => console.log(`Context: ${JSON.stringify(snapshot.context)}`));
rootActor.start();



