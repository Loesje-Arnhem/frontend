import { gql } from '@apollo/client/core'

export default gql`
  mutation REQUEST_WORKSHOP(
    $address: String
    $city: String
    $clientMutationId: String
    $companyName: String
    $date: String
    $email: String
    $location: String
    $motivation: String
    $name: String
    $phoneNumber: String
    $theme: String
    $time: String
    $totalAttendees: Int
    $totalWorkshops: Int
    $zipcode: String
  ) {
    requestWorkshop(
      input: {
        address: $address
        city: $city
        clientMutationId: $clientMutationId
        companyName: $companyName
        date: $date
        email: $email
        location: $location
        motivation: $motivation
        name: $name
        phoneNumber: $phoneNumber
        theme: $theme
        time: $time
        totalAttendees: $totalAttendees
        totalWorkshops: $totalWorkshops
        zipcode: $zipcode
      }
    ) {
      response
    }
  }
`
