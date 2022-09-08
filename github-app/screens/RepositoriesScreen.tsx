import * as React from 'react';
import { StyleSheet, FlatList, ScrollView } from 'react-native';
import {
  ActivityIndicator, Card, Paragraph, Button,
} from 'react-native-paper';
import { useState, useEffect } from 'react';
import { Route } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, RepositoriesParamList } from '../types';
import { View } from '../components/Themed';
import Repository from '../github-model/GithubRepo';
import Repositories from '../github-model/GithubRepos';
import getRepositories from '../github-model/repoQuery';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
});

/**
 * @param param0 navigation function and route params
 * @returns the Repositories screen
 */
export default function RepositoriesScreen({ navigation, route } :
{ navigation : BottomTabNavigationProp<BottomTabParamList, 'Repositories'>,
  route : Route<'Repositories', RepositoriesParamList['RepositoriesScreen']> }) : JSX.Element {
  const [repositories, setRepositories] = useState<null | Repositories>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  /**
   * Initialize the Repositories data
   */
  useEffect(() => {
    getRepositories(route.params?.login).then(
      (response : Repositories) => { setRepositories(null); setRepositories(response); },
      (error : Error) => { setErrorMsg(error.message); },
    );
  }, [route.params?.login]);

  if (errorMsg !== null) {
    return <View style={styles.container}>{errorMsg}</View>;
  }

  /**
   * @param props the card item
   * @returns the view of the list of Repository cards
   */
  function renderRepository(props : { item : Repository }) : JSX.Element {
    const repository = props.item;
    return (
      <Card style={{ margin: 10 }}>
        <Card.Title title={repository.name} />
        <Card.Content>
          <Button
            style={{ width: 300 }}
            icon="github"
            mode="outlined"
            onPress={() => navigation.navigate('Profile', { params: { login: repository.owner }, screen: 'ProfileScreen' })}
          >
            {repository.owner}
          </Button>
          <Paragraph>{repository.description}</Paragraph>
        </Card.Content>
      </Card>
    );
  }

  // render all cards
  return (
    <ScrollView>
      {repositories === null ? <View style={styles.container}><ActivityIndicator animating size="large" /></View>
        : (
          <FlatList
            data={repositories.repositories}
            renderItem={renderRepository}
            keyExtractor={(item) => item.name}
          />
        )}
    </ScrollView>
  );
}
