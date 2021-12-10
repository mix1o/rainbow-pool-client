import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/mix1o/rainbow",
  cache: new InMemoryCache(),
});

export const getDeposits = async () => {
  const response = await client.query({
    query: gql`
      query GetDeposits {
        deposits {
          id
          tokenAmount
          poolAddress
          poolDepositor {
            id
          }
        }
      }
    `,
  });

  return response;
};

export const getWithdraws = async () => {
  const response = await client.query({
    query: gql`
      query GetWithdraws {
        withdraws {
          id
          tokenAmount
          poolAddress
          poolDepositor {
            id
          }
        }
      }
    `,
  });
  return response;
};

export const getRewards = async () => {
  const response = await client.query({
    query: gql`
      query GetRewards {
        poolHistories {
          id
          reward
          poolAddress
        }
      }
    `,
  });

  return response;
};
