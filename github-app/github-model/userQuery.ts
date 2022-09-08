import axios, { AxiosResponse } from 'axios';

import User, { UserResponse } from './GithubUser';

const { ACCESS_TOKEN } = process.env;

const GRAPHQL_URL = 'https://api.github.com/graphql';

const USER_QUERY = `query User($login: String!) {
  user(login: $login) {
      avatarUrl(size: 200)
      name
      login
      bio
      websiteUrl
      email
      following {
          totalCount
      }
      followers {
          totalCount
      }
      createdAt
      repositories{
          totalCount
      }
  }
}`;

type GraphQLRepositoriesResponse = {
  data : {
    user : UserResponse
  }
};

/**
 * parse the user query given username
 * @param login the username
 * @returns parsed user
 */
export default async function getUser(login: string) : Promise<User> {
  const config = {
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN === undefined ? '' : ACCESS_TOKEN}`,
    },
  };
  const response : AxiosResponse<GraphQLRepositoriesResponse> = await axios.post(GRAPHQL_URL,
    { query: USER_QUERY, variables: { login } }, config);
  return new User(response.data.data.user);
}
