import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar, Headline, Title, Button, List, Paragraph, ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import getUser from '../github-model/userQuery';
import User from '../github-model/GithubUser';
import { Text, View } from '../components/Themed';
import { BottomTabParamList, ProfileParamList } from '../types';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: -15,
    marginTop: -15,
  },
  name: {
    marginTop: 10,
    paddingTop: 10,
    fontSize: 35,
  },
  bio: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 15,
  },
});

/**
 * @param param0 navigation function and route params
 * @returns the Profile screen
 */
export default function ProfileScreen({ navigation, route } :
{ navigation : BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  route : Route<'Profile', ProfileParamList['ProfileScreen']> }) : JSX.Element {
  const [user, setUser] = useState<null | User>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  /**
   * Initialize the Profile data
   */
  useEffect(() => {
    getUser(route.params?.login).then(
      (response) => { setUser(response); },
      (error : Error) => { setErrorMsg(error.message); },
    );
  }, [route.params?.login]);

  if (errorMsg !== null) {
    return <View style={styles.container}>{errorMsg}</View>;
  }

  // render the view
  return (
    <View>
      { user === null ? <View style={styles.container}><ActivityIndicator animating size="large" /></View>
        : (
          <View>
            <View style={styles.container}>
              <Avatar.Image size={160} source={{ uri: user.avatarUrl }} />
              <Headline style={styles.name}>{user.name}</Headline>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Icon style={{ marginRight: 6, marginTop: 2 }} name="github" size={24} />
                <Title>{user.login}</Title>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  style={{ margin: 5 }}
                  mode="outlined"
                  onPress={() => navigation.navigate('Followers', { params: { login: user.login }, screen: 'FollowersScreen' })}
                >
                  {user.followersCount}
                  {' '}
                  followers
                </Button>
                <Button
                  style={{ margin: 5 }}
                  mode="outlined"
                  onPress={() => navigation.navigate('Following', { params: { login: user.login }, screen: 'FollowingScreen' })}
                >
                  {user.followingCount}
                  {' '}
                  following
                </Button>
              </View>
              <Button
                style={{ margin: 5 }}
                mode="outlined"
                onPress={() => navigation.navigate('Repositories', { params: { login: user.login }, screen: 'RepositoriesScreen' })}
              >
                {user.repositoriesCount}
                {' '}
                repositories
              </Button>
              <Paragraph style={styles.bio}>{user.bio}</Paragraph>
            </View>
            <List.Item style={styles.listItem} title={user.email} left={() => <List.Icon icon="email" />} />
            <List.Item style={styles.listItem} title={user.websiteUrl} left={() => <List.Icon icon="link-variant" />} />
            <Text style={styles.bio}>
              Profile created at
              {' '}
              {user.createdAt.toLocaleDateString()}
              .
            </Text>
          </View>
        )}
    </View>
  );
}
