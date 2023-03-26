import { IResponsePage } from '~~/interfaces/IResponse'
import { IRelatedPosters } from '~~/interfaces/IContent'

export default (page: IResponsePage) => {
  const {
    related_posters_search,
    related_posters_subjects,
    related_posters_title,
    related_posters_posters,
  } = page.acf
  let posterIds: number[] = []
  if (related_posters_posters) {
    posterIds = related_posters_posters.map((poster) => poster.poster)
  }

  const relatedPosters: IRelatedPosters = {
    title: related_posters_search || null,
    search: related_posters_title || null,
    subjects: related_posters_subjects,
    posterIds,
  }
  return relatedPosters
}
