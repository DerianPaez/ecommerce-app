'use client'

import Snackbar from '@/components/snackbar'
import { createContext, useContext, useReducer } from 'react'
import { globalReducer } from './globa.reducer'
import { GlobalActions, GlobalContextProviderProps, GlobalContextType, GlobalState } from './types'

const initialGlobalState: GlobalState = {
  notification: {
    message: ''
  }
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

export const GlobalProvider = ({ children, initialState }: GlobalContextProviderProps) => {
  const [state, dispatch] = useReducer(globalReducer, { ...initialGlobalState, ...initialState })

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <Snackbar
        variant={state.notification.type}
        message={state.notification.message}
        open={Boolean(state.notification.message)}
        onClose={() => dispatch({ type: GlobalActions.hideNotification })}
      />
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider')
  }
  return context
}
