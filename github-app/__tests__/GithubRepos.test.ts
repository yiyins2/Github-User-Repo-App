import Repositories from '../github-model/GithubRepos';

describe('Repositories', () => {
  it('parses normal response correctly', () => {
    const testResponse = {
      totalCount: 1,
      nodes: [
        {
          id: 'a',
          name: 'b',
          owner: {
            login: 'c',
          },
          description: 'd',
        },
      ],
    };
    const repository = new Repositories(testResponse);
    expect(repository.totalCount).toBe(1);
    expect(repository.repositories.length).toBe(1);
  });
});
