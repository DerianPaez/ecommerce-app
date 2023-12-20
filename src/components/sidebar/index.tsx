import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarProps } from './types'

export default function Sidebar({ categories, isOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <nav
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed top-[145px] md:top-[89px] left-4 lg:left-10 bg-black border border-gray-900 z-50 w-[240px] h-[calc(100%-161px)] md:h-[calc(100%-105px)] overflow-y-scroll p-5 rounded-lg hide-scrollbar`}
    >
      <ul className='grid gap-4'>
        {categories.map(({ id, label, href }) => {
          const isActive = pathname.includes(href)
          return (
            <li key={id}>
              <Link
                href={`/categoria/${href}`}
                className={`${isActive ? 'text-primary-500' : ''} hover:text-primary-500`}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
