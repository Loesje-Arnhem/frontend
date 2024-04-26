export type MenuItem = {
  id: string
  title: string
  url: string
  external?: boolean
}

export type MenuItemWithChildren = MenuItem & {
  children?: MenuItem[]
}
