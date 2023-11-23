// import { createHttpLink, from } from '@apollo/client/core'
// import { setContext } from '@apollo/client/link/context'
// import { provideApolloClient } from '@vue/apollo-composable'
// import { GraphQLClient } from 'graphql-request';
// import { gql } from '@apollo/client';


/**
 * See example: https://github.com/nuxt-modules/apollo/issues/442
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { $apollo } = nuxtApp

  const GetCartDocument = gql`
  query {
    customer {
      sessionToken
    }
  }
`;

  // const createUpdateLink = (operation, forward) => {
  //   return forward(operation).map((response) => {
  //     /**
  //      * Check for session header and update session in local storage accordingly. 
  //      */
  //     const context = operation.getContext();
  //     const { response: { headers } } = context;
  //     const oldSessionToken = localStorage.getItem(process.env.SESSION_TOKEN_LS_KEY as string);
  //     const sessionToken = headers.get('woocommerce-session');
  //     if (sessionToken) {
  //       if (oldSessionToken !== sessionToken) {
  //         localStorage.setItem(process.env.SESSION_TOKEN_LS_KEY as string, sessionToken);
  //       }
  //     }

  //     return response;
  //   });
  // }

  const fetchSessionToken = async (forceFetch = false) => {

    let sessionToken;
    try {
      const graphQLClient = new GraphQLClient("https://shop.loesje.nl/grapql");

      const cartData = await graphQLClient.request(GetCartDocument);

      // If user doesn't have an account return accountNeeded flag.
      sessionToken = cartData?.cart?.sessionToken;

      if (!sessionToken) {
        throw new Error('Failed to retrieve a new session token');
      }
    } catch (err) {
      console.error(err);
    }

    return sessionToken;
  }

  const getSessionToken = async (forceFetch = false) => {
    let sessionToken = localStorage.getItem(process.env.SESSION_TOKEN_LS_KEY as string);
    if (!sessionToken || forceFetch) {
      sessionToken = await fetchSessionToken();
    }
    return sessionToken;
  }

  const createSessionLink = () => {
    return setContext(async (operation) => {
      const headers = {};
      const sessionToken = await getSessionToken();

      if (sessionToken) {
        headers['woocommerce-session'] = `Session ${sessionToken}`;

        return { headers };
      }

      return {};
    });
  }



  // Default httpLink (main communication for apollo)
  const httpLink = createHttpLink({
    uri: "https://shop.loesje.nl/grapql",
    useGETForQueries: true,
  })

  // Set custom links in the apollo client.
  // This is the link chain. Will be walked through from top to bottom. It can only contain 1 terminating
  // Apollo link, see: https://www.apollographql.com/docs/react/api/link/introduction/#the-terminating-link
  $apollo.defaultClient.setLink(from([
    createSessionLink(),
    httpLink,
  ]))

  // For using useQuery in `@vue/apollo-composable`
  provideApolloClient($apollo.defaultClient)
})