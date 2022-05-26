import { gql } from '@apollo/client/core'

export default gql`
  query DailyPoster($year: Int, $month: Int, $day: Int) {
    dailyPosters(
      first: 1
      where: { posterDateEquals: { year: $year, month: $month, day: $day } }
    ) {
      edges {
        node {
          title
          featuredImage {
            node {
              id
              medium: sourceUrl(size: MEDIUM)
            }
          }
        }
      }
    }
  }
`
