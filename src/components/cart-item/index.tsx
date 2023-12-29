'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import Image from 'next/image'
import { useState } from 'react'
import Counter from '../counter'
import { CartItemProps } from './types'

export default function CartItem({ id, name, price, image }: CartItemProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [count, setCount] = useState(1)

  return (
    <Card id={id} shadow='none' as='article' className='grid sm:grid-cols-cart-item items-center'>
      <CardHeader>
        <figure className='w-full h-72 sm:w-28 sm:h-28 flex justify-center items-center rounded-xl border border-divider overflow-hidden'>
          <Image
            src={image}
            width={500}
            height={500}
            alt={name}
            className='h-full w-full object-cover object-center place-items-center'
          />
        </figure>
      </CardHeader>

      <CardBody className='w-full grid gap-4 grid-flow-row auto-rows-max'>
        <div>
          <div className='lg:grid lg:grid-flow-col lg:gap-4 lg:auto-cols-max lg:justify-between'>
            <h3 className='text-lg font-semibold'>{name}</h3>
            <span className='text-xl font-semibold'>$ {Number((price * count).toFixed(2))}</span>
          </div>
          {price !== Number((price * count).toFixed(2)) && <span>$ {price}</span>}
        </div>

        <div className='grid gap-4 lg:grid-flow-col lg:auto-cols-max lg:justify-between'>
          <Counter value={count} onCountChange={(value) => setCount(value)} min={1} />
          <Button
            onPress={onOpen}
            className='w-max'
            color='danger'
            variant='flat'
            startContent={<TrashIcon className='h-5 w-5' />}
          >
            Eliminar
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className='flex flex-col gap-1'>Eliminar del carrito</ModalHeader>
                  <ModalBody>
                    <p>¿Estas seguro de eliminar el siguiente producto del carrito?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color='default' variant='light' onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color='danger' variant='flat' onPress={onClose}>
                      Eliminar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </CardBody>
    </Card>
  )
}
