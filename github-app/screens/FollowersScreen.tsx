import * as React from 'react';
import { StyleSheet, FlatList, ScrollView } from 'react-native';
import {
  ActivityIndicator, Card, Title, Avatar, Button,
} from 'react-native-paper';
import { useState, useEffect } from 'react';
import { Route } from '@react-navigation/routers';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { View } from '../components/Themed';
import { BottomTabParamList, FollowersParamList } from '../types';
import Follow from '../github-model/GithubFollow';
import Follows from '../github-model/GithubFollows';
import getFollowers from '../github-model/followersQuery';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
});

/**
 * @param param0 navigation function and route params
 * @returns the Following screen
 */
export default function FollowersScreen({ navigation, route } :
{ navigation : BottomTabNavigationProp<BottomTabParamList, 'Followers'>,
  route : Route<'Followers', FollowersParamList['FollowersScreen']> }) : JSX.Element {
  const [followers, setFollowers] = useState<null | Follows>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  /**
   * Initialize the Followers data
   */
  useEffect(() => {
    getFollowers(route.params?.login).then(
      (response : Follows) => { setFollowers(null); setFollowers(response); },
      (error : Error) => { setErrorMsg(error.message); },
    );
  }, [route.params?.login]);

  if (errorMsg !== null) {
    return <View style={styles.container}>{errorMsg}</View>;
  }

  /**
   * @param props the card item
   * @returns the view of the list of Follow cards
   */
  function renderFollow(props : { item : Follow }) : JSX.Element {
    const follow = props.item;
    return (
      <Card style={{ margin: 10 }}>
        <Card.Content>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar.Image
              style={{ marginRight: 10 }}
              size={70}
              source={{ uri: follow.avatarUrl }}
            />
            <View style={{ flexDirection: 'column' }}>
              <Title>{ follow.name }</Title>
              <Button
                style={{ width: 300 }}
                icon="github"
                mode="outlined"
                onPress={() => { navigation.navigate('Profile', { params: { login: follow.login }, screen: 'ProfileScreen' }); }}
              >
                {follow.login}
              </Button>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  }

  // render all cards
  return (
    <ScrollView>
      {followers === null ? <View style={styles.container}><ActivityIndicator animating size="large" /></View>
        : (
          <FlatList
            data={followers.follows}
            renderItem={renderFollow}
            keyExtractor={(item) => item.name}
          />
        )}
    </ScrollView>
  );
}
