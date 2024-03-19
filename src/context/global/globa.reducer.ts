import { GlobalAction, GlobalActions, GlobalState } from './types'

export const globalReducer = (state: GlobalState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case GlobalActions.showNotification:
      return { ...state, notification: { message: action.payload.message, type: action.payload.notificationType } }
    case GlobalActions.hideNotification:
      return { ...state, notification: { message: '' } }
    default:
      return state
  }
}
