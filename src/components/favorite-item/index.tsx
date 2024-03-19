'use client'

import { useProducts } from '@/context/products-context'
import { TrashIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import Image from 'next/image'
import AddToCart from '../add-to-cart'
import { FavoriteItemProps } from './types'

export default function FavoriteItem({ name, price, image, productId }: FavoriteItemProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { markAsFavorite } = useProducts()

  return (
    <Card id={productId} shadow='none' as='article' className='grid sm:grid-cols-cart-item items-center'>
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
            <Link href={productId} color='foreground' underline='hover' className='text-sm  cursor-pointer'>
              <h3 className='text-lg font-semibold'>{name}</h3>
            </Link>
            <span className='text-xl font-semibold'>$ {price}</span>
          </div>
        </div>

        <div className='grid gap-4 lg:grid-flow-col lg:auto-cols-max lg:justify-between'>
          <AddToCart productId={productId} />

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
                  <ModalHeader className='flex flex-col gap-1'>Eliminar de favoritos</ModalHeader>
                  <ModalBody>
                    <p>¿Estas seguro de eliminar el siguiente producto de favoritos?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color='default' variant='light' onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button
                      color='danger'
                      variant='flat'
                      onPress={() => {
                        onClose()
                        markAsFavorite({ productId, isFavorite: false })
                      }}
                    >
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
