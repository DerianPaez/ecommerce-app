export type SnackbarVariant = 'success' | 'error' | 'warning' | 'info'

export type SnackbarProps = {
  open: boolean
  onClose: () => void
  message: string
  variant?: SnackbarVariant
}
