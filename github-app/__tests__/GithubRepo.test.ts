import Repository from '../github-model/GithubRepo';

describe('Repository', () => {
  it('parses normal response correctly', () => {
    const testResponse = {
      name: 'a',
      owner: {
        login: 'b',
      },
      description: 'c',
    };
    const repository = new Repository(testResponse);
    expect(repository.name).toBe('a');
    expect(repository.owner).toBe('b');
    expect(repository.description).toBe('c');
  });
  it('parses null description correctly', () => {
    const testResponse = {
      name: 'a',
      owner: {
        login: 'b',
      },
      description: null,
    };
    const repository = new Repository(testResponse);
    expect(repository.description).toBe('');
  });
});
