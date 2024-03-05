import { tasksActor } from "./tasksMachine.actor";

export const getTasksState = tasksActor.getSnapshot().context;