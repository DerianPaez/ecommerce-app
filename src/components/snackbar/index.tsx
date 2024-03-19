import { Card, CardBody } from '@nextui-org/react'
import { useEffect } from 'react'
import { SnackbarProps, SnackbarVariant } from './types'

export default function Snackbar({ open, onClose, variant, message }: SnackbarProps) {
  const snackBarTypes: Record<SnackbarVariant, string> = {
    success: 'bg-success',
    error: 'bg-danger',
    info: 'bg-primary-500',
    warning: 'bg-warning'
  }

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [open])

  return (
    <>
      {open && (
        <Card
          shadow='lg'
          className={`${variant ? snackBarTypes[variant] : ''} text-white fixed top-6 right-4 min-w-[300px] z-50`}
        >
          <CardBody className='px-5 py-4'>
            <p>{message}</p>
          </CardBody>
        </Card>
      )}
    </>
  )
}
