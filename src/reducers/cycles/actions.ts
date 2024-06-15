import { Cycle } from './reducers'

export enum ActionTypes {
  CREATE_CYCLE = 'CREATE_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.CREATE_CYCLE,
    payload: { newCycle },
  }
}

export function finishCycleAction() {
  return {
    type: ActionTypes.FINISH_CYCLE,
  }
}

export function interruptCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CYCLE,
  }
}
