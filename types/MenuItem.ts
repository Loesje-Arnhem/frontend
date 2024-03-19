export type MenuItem = {
  id: string
  title: string
  url: string
  external?: string
}

export type MenuItemWithChildren = MenuItem & {
  children?: MenuItem[]
}
