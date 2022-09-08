import axios, { AxiosResponse } from 'axios';

import Follows, { FollowsResponse } from './GithubFollows';

const { ACCESS_TOKEN } = process.env;

const GRAPHQL_URL = 'https://api.github.com/graphql';

const FOLLOWERS_QUERY = `query User($login: String!) {
  user(login: $login) {
    followers(first: 100) {
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

type GraphQLFollowersResponse = {
  data : {
    user : {
      followers : FollowsResponse
    }
  }
};

/**
 * parse the follower query given user
 * @param login the user
 * @returns a list of followers of the user
 */
export default async function getFollowers(login: string) : Promise<Follows> {
  const config = {
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN === undefined ? '' : ACCESS_TOKEN}`,
    },
  };
  const response : AxiosResponse<GraphQLFollowersResponse> = await axios.post(GRAPHQL_URL,
    { query: FOLLOWERS_QUERY, variables: { login } }, config);
  return new Follows(response.data.data.user.followers);
}
