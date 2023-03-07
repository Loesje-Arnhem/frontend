export const useSearch = () => useState<string>('search', () => '')
export const useMenu = () => useState<boolean>('menuIsOpen', () => false)
