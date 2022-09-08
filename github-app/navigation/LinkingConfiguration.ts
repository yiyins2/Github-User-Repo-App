import * as Linking from 'expo-linking';

/**
 * Link between all screens
 */
export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
          Repositories: {
            screens: {
              RepositoriesScreen: 'repositories',
            },
          },
          Followers: {
            screens: {
              FollowersScreen: 'followers',
            },
          },
          Following: {
            screens: {
              FollowingScreen: 'following',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
