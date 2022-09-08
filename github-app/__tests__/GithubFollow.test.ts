import Follow from '../github-model/GithubFollow';

describe('Follow', () => {
  it('parses normal response correctly', () => {
    const testResponse = {
      node: {
        avatarUrl: 'url',
        name: 'nn',
        login: 'll',
      },
    };
    const follow = new Follow(testResponse);
    expect(follow.avatarUrl).toBe('url');
    expect(follow.name).toBe('nn');
    expect(follow.login).toBe('ll');
  });
  it('parses null description correctly', () => {
    const testResponse = {
      node: {
        avatarUrl: 'url',
        name: null,
        login: 'll',
      },
    };
    const follow = new Follow(testResponse);
    expect(follow.name).toBe('');
  });
});
