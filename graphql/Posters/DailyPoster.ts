import { gql } from '@apollo/client/core'
import FeaturedImage from '../Media/Fragments/FeaturedImage'

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
            ...featuredImage
          }
        }
      }
    }
  }
  ${FeaturedImage}
`
