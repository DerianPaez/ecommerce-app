export type SidebarProps = {
  categories: Category[]
  isOpen: boolean
}

export type Category = {
  id: string
  label: string
  href: string
}
