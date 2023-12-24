import { NavbarMenu, NavbarMenuItem } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarProps } from './types'

export default function Sidebar({ categories }: SidebarProps) {
  const pathname = usePathname()

  return (
    <NavbarMenu
      className='!h-[calc(100vh-129px)] md:!h-[calc(100vh-73px)] pl-4 md:pl-10 pb-8'
      style={{ '--navbar-height': 'auto' } as React.CSSProperties}
    >
      {categories.map(({ id, label, href }) => {
        const isActive = pathname.includes(href)

        return (
          <NavbarMenuItem key={id} isActive={isActive}>
            <Link href={`/categoria/${href}`} className={`${isActive ? 'text-primary' : ''} hover:text-primary`}>
              {label}
            </Link>
          </NavbarMenuItem>
        )
      })}
    </NavbarMenu>
  )
}
