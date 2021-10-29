import '../styles/globals.css';
import { ApolloClient, ApolloProvider, InMemoryCache , createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context';


const newClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
  <ApolloProvider client={newClient}> 
    <Component {...pageProps} />
  </ApolloProvider>)
}
export default MyApp
