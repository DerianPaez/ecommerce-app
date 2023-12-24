'use client'

import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarMenuToggle,
  Skeleton,
  User
} from '@nextui-org/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Logo from '../logo'
import Sidebar from '../sidebar'
import ThemeSwitcher from '../switch-theme'

export default function Navigation() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [pathname])

  const categories = [
    {
      id: '1',
      label: 'Ropa de mujer',
      href: 'ropa-mujer'
    },
    {
      id: '2',
      label: 'Ropa de hombre',
      href: 'ropa-hombre'
    },
    {
      id: '3',
      label: 'Ropa infantil',
      href: 'ropa-infantil'
    },
    {
      id: '4',
      label: 'Calzado de mujer',
      href: 'calzado-mujer'
    },
    {
      id: '5',
      label: 'Calzado de hombre',
      href: 'calzado-hombre'
    },
    {
      id: '6',
      label: 'Calzado infantil',
      href: 'calzado-infantil'
    },
    {
      id: '7',
      label: 'Electrónica de consumo',
      href: 'electronica-consumo'
    },
    {
      id: '8',
      label: 'Electrónica para el hogar',
      href: 'electronica-hogar'
    },
    {
      id: '9',
      label: 'Electrónica para el trabajo',
      href: 'electronica-trabajo'
    },
    {
      id: '10',
      label: 'Hogar y jardín',
      href: 'hogar-jardin'
    },
    {
      id: '11',
      label: 'Cocina y menaje',
      href: 'cocina-menaje'
    },
    {
      id: '12',
      label: 'Decoración',
      href: 'decoracion'
    },
    {
      id: '13',
      label: 'Belleza y cuidado personal',
      href: 'belleza-cuidado-personal'
    },
    {
      id: '14',
      label: 'Maquillaje',
      href: 'maquillaje'
    },
    {
      id: '15',
      label: 'Cuidado de la piel',
      href: 'cuidado-piel'
    },
    {
      id: '16',
      label: 'Cuidado del cabello',
      href: 'cuidado-cabello'
    }
  ]

  return (
    <Navbar
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{ wrapper: 'max-w-full p-4 md:px-10 border-b border-divider' }}
      style={{ '--navbar-height': 'auto' } as React.CSSProperties}
    >
      <div className='w-full grid grid-navigation-areas items-center justify-between gap-4 md:gap-8'>
        <div className='logo-area grid grid-flow-col items-center gap-3 md:gap-4'>
          <NavbarMenuToggle
            className='h-10 text-primary bg-primary/20'
            as={Button}
            isIconOnly
            variant='flat'
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          />
          <Logo />
        </div>
        <div className='searchbar-area w-full'>
          <Input
            classNames={{
              base: 'h-10 w-full',
              mainWrapper: 'h-full',
              input: 'text-small',
              inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
            }}
            variant='bordered'
            placeholder='Buscar...'
            size='md'
            type='search'
          />
        </div>
        <div className='actions-area grid grid-flow-col items-center gap-3 md:gap-4'>
          <ThemeSwitcher />

          {status === 'authenticated' && (
            <Dropdown>
              <DropdownTrigger>
                <User
                  name={session?.user?.name}
                  description={session?.user?.email}
                  avatarProps={{
                    src: session?.user?.image ?? '',
                    isBordered: true
                  }}
                  classNames={{
                    base: 'gap-0 sm:gap-2 cursor-pointer',
                    name: 'hidden sm:block',
                    description: 'hidden sm:block'
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => signOut()}>Cerrar Sesión</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}

          {status === 'unauthenticated' && (
            <>
              <Button onClick={() => signIn()} color='primary' variant='flat' className='hidden md:block'>
                Iniciar sesión
              </Button>

              <Button onClick={() => signIn()} color='primary' variant='flat' size='md' className='flex md:hidden'>
                Entrar
              </Button>
            </>
          )}

          {status === 'loading' && (
            <div className='w-full flex items-center gap-3'>
              <div>
                <Skeleton className='flex rounded-full w-10 h-10' />
              </div>
              <div className='hidden sm:flex w-full flex-col gap-2'>
                <Skeleton className='h-3 w-28 rounded-lg' />
                <Skeleton className='h-3 w-36 rounded-lg' />
              </div>
            </div>
          )}

          <Button onClick={() => alert('Cart')} isIconOnly color='primary' variant='flat'>
            <ShoppingCartIcon className='h-5 w-5 text-primary' />
          </Button>
        </div>
      </div>

      <Sidebar categories={categories} />
    </Navbar>
  )
}
