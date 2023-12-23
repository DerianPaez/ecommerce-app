'use client'

import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'

export default function SignIxn() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  return (
    <div className='h-screen grid place-items-center p-6'>
      <Card className='max-w-[300px] w-full'>
        <CardHeader className='font-bold justify-center pb-0 pt-5'>
          <Link href='/'>Ecommerce</Link>
        </CardHeader>
        <CardBody>
          <Button onClick={() => signIn('google', { callbackUrl })} className='text-base'>
            <FcGoogle className='w-10 h-10' />
            Continua con Google
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
