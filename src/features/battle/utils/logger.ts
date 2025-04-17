import { ActionLog, TurnLog, TurnLogger } from "../types";

let turnLogCallback: TurnLogger | null = null;

export const registerTurnLogCallback = (fn: TurnLogger) => {
  turnLogCallback = fn;
};

export const submitTurnLog = (turnLog: TurnLog) => {
  if (turnLogCallback) {
    turnLogCallback(turnLog);
  } else {
    throw new Error("Turn log callback not registered!");
  }
};


let activeTurnLog: TurnLog | null = null;

export const startNewTurnLog = (turnLog: TurnLog) => {
  activeTurnLog = turnLog;
};

export const addActionToTurnLog = (actionLog: ActionLog): void => {
  if (activeTurnLog) {
    activeTurnLog.actions.push(actionLog);
  } else {
    throw new Error("No active turn log started!");
  }
};
