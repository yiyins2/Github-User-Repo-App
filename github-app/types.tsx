export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Profile: { params: { login: string }, screen: 'ProfileScreen' };
  Repositories: { params: { login: string }, screen: 'RepositoriesScreen' };
  Followers: { params: { login: string }, screen: 'FollowersScreen' };
  Following: { params: { login: string }, screen: 'FollowingScreen' };
};

export type ProfileParamList = {
  ProfileScreen: { login: string; };
};

export type RepositoriesParamList = {
  RepositoriesScreen: { login: string; };
};

export type FollowersParamList = {
  FollowersScreen: { login: string; };
};

export type FollowingParamList = {
  FollowingScreen: { login: string; };
};
