import Repository, { RepositoryResponse } from './GithubRepo';

export type RepositoriesResponse = {
  totalCount: number;
  nodes: RepositoryResponse[];
};

/**
 * The list of Repository structure to parse into
 */
export default class Repositories {
  readonly totalCount: number;

  readonly repositories: Repository[];

  constructor(response: RepositoriesResponse) {
    this.totalCount = response.totalCount;
    this.repositories = response.nodes.map((repositoryResponse) :
    Repository => new Repository(repositoryResponse));
  }
}
