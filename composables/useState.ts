import { SourceFragment, SubjectFragment } from '#gql'

export const useMenu = () => useState<boolean>('menuIsOpen', () => false)
export const useFavoriteIds = () => useState<number[]>('favorites', () => [])
export const useSelectedTags = () => useState<(SourceFragment | SubjectFragment)[]>('selectedTags', () => [])
export const useDateBefore = () => useState<string>('dateBefore', () => '')
export const useDateAfter = () => useState<string>('dateAfter', () => '')
export const useSearch = () => useState<string>('search', () => '')

export const useDonation = () => useState('donation', () => {
    return {
        body: '',
        amount: 0,
        target: 0,
        enabled: false,
        loaded: false,
        progress: `0%`
    }
})
