import { assign, setup } from 'xstate';
import { ETasksActorActions } from './tasksMachine.types';
import { TTasksMechineEvents, TAddTask, TRemoveTask, ITasksMachineContext } from "./tasksMachine.types";

export const tasksMachine = setup({
  types: {} as {
    events: TTasksMechineEvents | TAddTask | TRemoveTask,
    context: ITasksMachineContext,
  },
  actions: {
    addTask: assign({
      tasks: ({context, event}) => {
        const { data } = event as TAddTask;
        return [...context.tasks, data]
      }
    }),
    removeTask: assign({
      tasks: ({context, event}) => {
        const { data } = event as TRemoveTask;
        return [...context.tasks.filter( item => item !== data)]
      }
    })
  }
}).createMachine({
    id: 'tasksMachine',
    initial: 'Inactive',
    context: {
      tasksCount: 0,
      tasks: ['Call and say "Hi" to Itay']
    },
    states: {
      Inactive: {
        on:{
          TOGGLE: 'Active',
        }
      },
      Active: {
        on: {
          ADD_TASK: {
            actions: [ETasksActorActions.ADD_TASK]
          },
          REMOVE_TASK: {
            actions:[ETasksActorActions.REMOVE_TASK]
          },
          TOGGLE: 'Inactive',
        }
      }
    }
  });