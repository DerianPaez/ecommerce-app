'use client'

import Logo from '@/components/logo'
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import Link from 'next/link'

export default function SignIxn() {
  return (
    <div className='h-screen grid place-items-center p-6'>
      <Card className='max-w-[300px] w-full'>
        <CardHeader className='font-bold justify-center pb-0 pt-5'>
          <Logo />
        </CardHeader>
        <CardBody>
          <div className='grid gap-4'>
            <p className='text-center'>Se ha producido un error, vuelva a intentarlo más tarde.</p>
            <Button href='/' as={Link} className='text-base'>
              Volver al Inicio
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
