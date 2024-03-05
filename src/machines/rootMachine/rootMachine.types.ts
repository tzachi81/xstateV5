export enum ERootActorActions {
    CURRENT_STATE = 'currentState',
    TOGGLE = 'toggle'
}
export type TRootMechineEvents =
  {type: 'TOGGLE'};

export type TAddTask = {type: 'ADD_TASK', data: string};
export type TRemoveTask = {type: 'REMOVE_TASK', data: string};

export interface IRootMachineContext {

}