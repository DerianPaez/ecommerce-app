import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react'
import { CartSummaryProps } from './type'

export default function CartSummary({
  className,
  subtotal = 0,
  discount = 0,
  shipping = 0,
  tax = 0,
  total = 0
}: CartSummaryProps) {
  return (
    <Card shadow='none' className={`${className} border border-divider`}>
      <CardHeader>
        <h3 className='text-lg font-bold'>Resumen</h3>
      </CardHeader>

      <CardBody className='grid grid-flow-row auto-rows-max gap-2'>
        <div className='grid grid-flow-col auto-cols-max justify-between'>
          <span>Subtotal</span>
          <span>$ {subtotal.toFixed(2)}</span>
        </div>

        {/* TODO: Active */}
        {/* <div className='grid grid-flow-col auto-cols-max justify-between items-center'>
          <span className='text-sm text-gray-500'>Descuento</span>
          <span className='text-sm text-gray-500'>$ {discount}</span>
        </div>

        <div className='grid grid-flow-col auto-cols-max justify-between items-center'>
          <span className='text-sm text-gray-500'>Envio</span>
          <span className='text-sm text-gray-500'>$ {shipping.toFixed(2)}</span>
        </div> */}

        <div className='grid grid-flow-col auto-cols-max justify-between items-center'>
          <span className='text-sm text-gray-500'>Impuestos</span>
          <span className='text-sm text-gray-500'>$ {tax.toFixed(2)}</span>
        </div>

        <Divider className='my-2' />

        <div className='grid grid-flow-col auto-cols-max justify-between'>
          <span className='font-semibold'>Total</span>
          <span className='font-semibold'>$ {total.toFixed(2)}</span>
        </div>
      </CardBody>

      <CardFooter>
        <Button color='success' variant='flat' isDisabled={subtotal === 0}>
          Reservar por Whatsapp
        </Button>
      </CardFooter>
    </Card>
  )
}
