import Follows from '../github-model/GithubFollows';

describe('Follows', () => {
  it('parses normal response correctly', () => {
    const testResponse = {
      edges: [{
        node: {
          avatarUrl: 'url',
          name: 'nn',
          login: 'll',
        },
      }],
    };
    const follows = new Follows(testResponse);
    expect(follows.follows.length).toBe(1);
  });
});
