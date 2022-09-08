import User from '../github-model/GithubUser';

describe('Repository', () => {
  it('parses normal response correctly', () => {
    const testResponse = {
      avatarUrl: 'a',
      name: 'b',
      login: 'c',
      bio: 'd',
      websiteUrl: 'e',
      email: 'f',
      followers: { totalCount: 1 },
      following: { totalCount: 2 },
      createdAt: '9/5/2017',
      repositories: { totalCount: 3 },
    };
    const user = new User(testResponse);
    expect(user.avatarUrl).toBe('a');
    expect(user.name).toBe('b');
    expect(user.login).toBe('c');
    expect(user.bio).toBe('d');
    expect(user.websiteUrl).toBe('e');
    expect(user.email).toBe('f');
    expect(user.followersCount).toBe(1);
    expect(user.followingCount).toBe(2);
    expect(user.createdAt.toLocaleDateString()).toBe('9/5/2017');
    expect(user.repositoriesCount).toBe(3);
  });
  it('parses null name correctly', () => {
    const testResponse = {
      avatarUrl: 'a',
      name: null,
      login: 'c',
      bio: 'd',
      websiteUrl: 'e',
      email: 'f',
      followers: { totalCount: 1 },
      following: { totalCount: 2 },
      createdAt: 'g',
      repositories: { totalCount: 3 },
    };
    const user = new User(testResponse);
    expect(user.name).toBe('');
  });
  it('parses null bio correctly', () => {
    const testResponse = {
      avatarUrl: 'a',
      name: 'b',
      login: 'c',
      bio: null,
      websiteUrl: 'e',
      email: 'f',
      followers: { totalCount: 1 },
      following: { totalCount: 2 },
      createdAt: 'g',
      repositories: { totalCount: 3 },
    };
    const user = new User(testResponse);
    expect(user.bio).toBe('');
  });
  it('parses null websiteUrl correctly', () => {
    const testResponse = {
      avatarUrl: 'a',
      name: 'b',
      login: 'c',
      bio: 'd',
      websiteUrl: null,
      email: 'f',
      followers: { totalCount: 1 },
      following: { totalCount: 2 },
      createdAt: 'g',
      repositories: { totalCount: 3 },
    };
    const user = new User(testResponse);
    expect(user.websiteUrl).toBe('');
  });
});
