import type { ITag } from '~/types/Content'

export const useMenu = () => useState<boolean>('menuIsOpen', () => false)
export const useFavoriteIds = () => useState<number[]>('favorites', () => [])
export const useSelectedTags = () => useState<ITag[]>('selectedTags', () => [])
export const useDateBefore = () => useState<string>('dateBefore', () => '')
export const useDateAfter = () => useState<string>('dateAfter', () => '')
export const useSearch = () => useState<string>('search', () => '')
export const useCart = () => useState('cart', () => null)
