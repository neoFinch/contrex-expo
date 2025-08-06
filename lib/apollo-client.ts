import { ApolloClient, InMemoryCache } from '@apollo/client';
import { STRAPI_URL } from './constants';

export const client = new ApolloClient({
  // uri: 'http://localhost:1337/graphql',
  uri: `${STRAPI_URL}/graphql`,
  cache: new InMemoryCache(),
});