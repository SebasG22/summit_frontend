import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://3000-sebasg22-summitbackend-srelrw4hln7.ws-us75.gitpod.io/graphql',
  cache: new InMemoryCache(),
});


export default function App({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
}
