export type UserResponse = {
  avatarUrl: string;
  name: null | string;
  login: string;
  bio: null | string;
  websiteUrl: null | string;
  email: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  createdAt: string;
  repositories: { totalCount: number };
};

/**
 * The user structure to parse into
 */
export default class User {
  readonly avatarUrl: string;

  readonly name: string;

  readonly login: string;

  readonly bio: string;

  readonly websiteUrl: string;

  readonly email: string;

  readonly followersCount: number;

  readonly followingCount: number;

  readonly createdAt: Date;

  readonly repositoriesCount: number;

  constructor(response: UserResponse) {
    this.avatarUrl = response.avatarUrl;
    this.name = response.name === null ? '' : response.name;
    this.login = response.login;
    this.bio = response.bio === null ? '' : response.bio;
    this.websiteUrl = response.websiteUrl === null ? '' : response.websiteUrl;
    this.email = response.email;
    this.followersCount = response.followers.totalCount;
    this.followingCount = response.following.totalCount;
    this.createdAt = new Date(response.createdAt);
    this.repositoriesCount = response.repositories.totalCount;
  }
}
