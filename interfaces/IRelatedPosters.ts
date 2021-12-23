export interface IRelatedPostersPoster {
  poster: {
    databaseId: number
  }
}

export interface IRelatedPostersSubject {
  databaseId: number
  name: string
}

export interface IRelatedPosters {
  title: string | null
  search: string | null
  subjects: IRelatedPostersSubject[] | null
  posters: IRelatedPostersPoster[] | null
}
