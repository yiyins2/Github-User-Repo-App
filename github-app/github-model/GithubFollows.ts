import Follow, { FollowResponse } from './GithubFollow';

export type FollowsResponse = {
  edges: FollowResponse[]
};

/**
 * The list of Follow structure to parse into
 */
export default class Follows {
  readonly follows: Follow[];

  constructor(response: FollowsResponse) {
    this.follows = response.edges.map((followResponse) :
    Follow => new Follow(followResponse));
  }
}
