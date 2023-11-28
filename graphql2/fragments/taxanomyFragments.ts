import { gql } from '~/types/__generated__'

export const Source = gql(`fragment Source on Source {
  id
  databaseId
  title: name
  taxonomy {
    node {
      name
    }
  }
}
`)

export const Subject = gql(`fragment Subject on Subject {
  id
  databaseId
  title: name
  taxonomy {
    node {
      name
    }
  }
}
`)

export const SourceNode =
  gql(`fragment SourceNode on PosterToSourceConnectionEdge {
  node {
    ...Source
  }
}
`)

export const Sources = gql(`fragment Sources on PosterToSourceConnection {
  edges {
    ...SourceNode
  }
}
`)

export const SubjectNode =
  gql(`fragment SubjectNode on PosterToSubjectConnectionEdge {
  node {
    ...Subject
  }
}
`)

export const Subjects = gql(`fragment Subjects on PosterToSubjectConnection {
  edges {
    ...SubjectNode
  }
}
`)
