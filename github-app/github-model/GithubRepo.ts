export type RepositoryResponse = {
  name: string;
  owner: { login: string };
  description: null | string;
};

/**
 * The Repository structure to parse into
 */
export default class Repository {
  readonly name: string;

  readonly owner: string;

  readonly description: string;

  constructor(response: RepositoryResponse) {
    this.name = response.name;
    this.owner = response.owner.login;
    this.description = response.description === null ? '' : response.description;
  }
}
