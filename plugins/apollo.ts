import { createHttpLink, from } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { apiUrl } from '~/data/siteDetails';



export default defineNuxtPlugin((nuxtApp) => {
  const { $apollo } = useNuxtApp();

  const httpLink = createHttpLink({
    uri: `${apiUrl}graphql`,
  })

  const batchLink = new BatchHttpLink({
    uri: `${apiUrl}graphql`,
    batchMax: 5, // No more than 5 operations per batch
    batchInterval: 20 // Wait no more than 20ms after first batched operation
  });

  const errorLink = onError((err) => {
    nuxtApp.callHook('apollo:error', err);
  });


  // Set custom links in the apollo client (in this case, the default apollo client)
  $apollo.defaultClient.setLink(from([errorLink, httpLink, batchLink]));

  nuxtApp.hook('apollo:error', (error) => {
    console.error(error);
  });
});