import { rootActor } from "./rootMachine.actor";

export const getRootState = rootActor.getSnapshot().context;