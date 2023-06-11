import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BaseGraphUri, HasuraToken } from "./Constant";

const httpLink = createHttpLink({
    uri: BaseGraphUri,
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = HasuraToken
    return {
      headers: {
        ...headers,
        "x-hasura-admin-secret": token,
      },
    };
  });
  
  export const GraphQlClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });