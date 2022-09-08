import axios, { AxiosResponse } from 'axios';

import Repositories, { RepositoriesResponse } from './GithubRepos';

const { ACCESS_TOKEN } = process.env;

const GRAPHQL_URL = 'https://api.github.com/graphql';

const REPO_QUERY = `query User($login: String!) {
  user(login: $login) {
      repositories(orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC, first: 100) {
          totalCount
          nodes {
              name
              owner {
              login
              }
              description
          }
      }
  }
}`;

type GraphQLRepositoriesResponse = {
  data : {
    user : {
      repositories : RepositoriesResponse
    }
  }
};

/**
 * parse the repositories query given user
 * @param login the user
 * @returns a list of repositories of the user
 */
export default async function getRepositories(login: string) : Promise<Repositories> {
  const config = {
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN === undefined ? '' : ACCESS_TOKEN}`,
    },
  };
  const response : AxiosResponse<GraphQLRepositoriesResponse> = await axios.post(GRAPHQL_URL,
    { query: REPO_QUERY, variables: { login } }, config);
  return new Repositories(response.data.data.user.repositories);
}
