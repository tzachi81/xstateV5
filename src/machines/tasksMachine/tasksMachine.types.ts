export enum ETasksActorActions {
    CURRENT_STATE = 'currentState',
    TOGGLE = 'toggle',
    ADD_TASK = 'addTask',
    REMOVE_TASK = 'removeTask',
}
export type TTasksMechineEvents = {type: 'TOGGLE'};

export type TAddTask = {type: 'ADD_TASK', data: string};
export type TRemoveTask = {type: 'REMOVE_TASK', data: string};

export interface ITasksMachineContext {
  tasksCount: number,
  tasks: string[]
}