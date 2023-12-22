export type MenuItem = {
  id: string
  title: string
  url: string
}

export type MenuItemWithChildren = MenuItem & {
  children?: MenuItem[]
}
