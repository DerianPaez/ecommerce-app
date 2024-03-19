import { SnackbarVariant } from '@/components/snackbar/types'
import { Dispatch } from 'react'

export type GlobalState = {
  notification: {
    message: string
    type?: SnackbarVariant
  }
}

export type GlobalContextProviderProps = {
  children: React.ReactNode
  initialState?: Partial<GlobalState>
}

export type GlobalContextType = {
  state: GlobalState
  dispatch: Dispatch<GlobalAction>
}

export enum GlobalActions {
  showNotification = 'SHOW_NOTIFICATION',
  hideNotification = 'HIDE_NOTIFICATION'
}

interface ActionWithPayload<T, P> {
  type: T
  payload: P
}

type NotificationAction =
  | ActionWithPayload<GlobalActions.showNotification, { message: string; notificationType?: SnackbarVariant }>
  | { type: GlobalActions.hideNotification }

export type GlobalAction = NotificationAction
