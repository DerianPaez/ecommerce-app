import { Bars3Icon } from '@heroicons/react/24/outline'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarProps } from './types'

export default function Sidebar({ categories }: SidebarProps) {
  const pathname = usePathname()

  return (
    <Dropdown closeOnSelect placement='bottom-start'>
      <DropdownTrigger>
        <Button isIconOnly variant='flat' color='primary'>
          <Bars3Icon className='h-6 w-6 text-primary-500' />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Categorías' items={categories}>
        {({ id, label, href }) => {
          const isActive = pathname.includes(href)

          return (
            <DropdownItem
              key={id}
              as={Link}
              href={`/categoria/${href}`}
              className={`${isActive ? 'text-primary-500' : ''}`}
            >
              {label}
            </DropdownItem>
          )
        }}
      </DropdownMenu>
    </Dropdown>
  )
}
