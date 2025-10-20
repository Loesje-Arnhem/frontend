export type MenuItem = {
  id: number
  title: string
  url: string
  external?: boolean
}

export type MenuItemWithChildren = MenuItem & {
  children?: MenuItem[]
}
