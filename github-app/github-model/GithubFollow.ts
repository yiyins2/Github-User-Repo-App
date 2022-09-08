export type FollowResponse = {
  node: {
    avatarUrl: string
    name: null | string;
    login: string;
  }
};

/**
 * The Follow structure to parse into
 */
export default class Follow {
  readonly avatarUrl: string;

  readonly name: string;

  readonly login: string;

  constructor(response: FollowResponse) {
    this.avatarUrl = response.node.avatarUrl;
    this.name = response.node.name === null ? '' : response.node.name;
    this.login = response.node.login;
  }
}
