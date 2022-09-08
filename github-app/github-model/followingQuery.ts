import axios, { AxiosResponse } from 'axios';

import Follows, { FollowsResponse } from './GithubFollows';

const { ACCESS_TOKEN } = process.env;

const GRAPHQL_URL = 'https://api.github.com/graphql';

const FOLLOWING_QUERY = `query User($login: String!) {
  user(login: $login) {
    following(first: 100) {
      edges {
        node {
          avatarUrl(size: 200)
          name
          login
        }
      }
    }
  }
}`;

type GraphQLFollowingResponse = {
  data : {
    user : {
      following : FollowsResponse
    }
  }
};

/**
 * parse the following query given user
 * @param login the user
 * @returns a list of following of the user
 */
export default async function getFollowing(login: string) : Promise<Follows> {
  const config = {
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN === undefined ? '' : ACCESS_TOKEN}`,
    },
  };
  const response : AxiosResponse<GraphQLFollowingResponse> = await axios.post(GRAPHQL_URL,
    { query: FOLLOWING_QUERY, variables: { login } }, config);
  return new Follows(response.data.data.user.following);
}
