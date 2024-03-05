import { setup, sendTo, spawnChild, stopChild, assign } from 'xstate';
import { TRootMechineEvents, TAddTask, TRemoveTask, IRootMachineContext } from "./rootMachine.types";
import { tasksMachine } from '../tasksMachine/tasks.machine';
import { tasksActor } from '../tasksMachine';

export const rootMachine = setup({
  types: {} as {
    events: TRootMechineEvents | TAddTask | TRemoveTask,
    context: IRootMachineContext,
  },
  actions: { },
  actors:{
    tasksMachine: tasksMachine
  }
}).createMachine({
    id: 'rootMachine',
    initial: 'Inactive',
    context: { },
    states: {
      Inactive: {
        on: {
          TOGGLE: {
            target: 'Active' 
          }
        }
      },
      Active: {
        entry: [
          spawnChild('tasksMachine', {id:'tasksMachine'}),
          sendTo(tasksActor, {type: 'TOGGLE'})
        ],

        on: {
          TOGGLE: {
            actions: [
              stopChild('tasksMachine'),
              assign({ tasksMachine: undefined}),
              sendTo(tasksActor, {type: 'TOGGLE'})
            ],
            target:'Inactive'
          }
        }
      }
    }
  });