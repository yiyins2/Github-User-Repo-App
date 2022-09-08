/* eslint-disable react/jsx-props-no-spreading */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ProfileScreen from '../screens/ProfileScreen';
import RepositoriesScreen from '../screens/RepositoriesScreen';
import FollowersScreen from '../screens/FollowersScreen';
import FollowingScreen from '../screens/FollowingScreen';
import {
  BottomTabParamList, ProfileParamList, RepositoriesParamList, FollowersParamList,
  FollowingParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
  return <MaterialCommunityIcons size={24} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
/**
 * The Profile tab navigator
 */
const ProfileStack = createStackNavigator<ProfileParamList>();
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile' }}
        initialParams={{ login: 'yiyins2' }}
      />
    </ProfileStack.Navigator>
  );
}

/**
 * The Repositories tab navigator
 */
const RepoStack = createStackNavigator<RepositoriesParamList>();
function RepositoriesNavigator() {
  return (
    <RepoStack.Navigator>
      <RepoStack.Screen
        name="RepositoriesScreen"
        component={RepositoriesScreen}
        options={{ headerTitle: 'Repositories' }}
        initialParams={{ login: 'yiyins2' }}
      />
    </RepoStack.Navigator>
  );
}

/**
 * The Followers tab navigator
 */
const FollowersStack = createStackNavigator<FollowersParamList>();
function FollowersNavigator() {
  return (
    <FollowersStack.Navigator>
      <FollowersStack.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{ headerTitle: 'Followers' }}
        initialParams={{ login: 'yiyins2' }}
      />
    </FollowersStack.Navigator>
  );
}

/**
 * The Following tab navigator
 */
const FollowingStack = createStackNavigator<FollowingParamList>();
function FollowingNavigator() {
  return (
    <FollowingStack.Navigator>
      <FollowingStack.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ headerTitle: 'Following' }}
        initialParams={{ login: 'yiyins2' }}
      />
    </FollowingStack.Navigator>
  );
}

/**
 * Putting all screens and tab navigator together
 */
export default function BottomTabNavigator() : JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color } : { color : string }) => <TabBarIcon name="account" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Repositories"
        component={RepositoriesNavigator}
        options={{
          tabBarIcon: ({ color } : { color : string }) => <TabBarIcon name="source-repository" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Followers"
        component={FollowersNavigator}
        options={{
          tabBarIcon: ({ color } : { color : string }) => <TabBarIcon name="account-arrow-left" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Following"
        component={FollowingNavigator}
        options={{
          tabBarIcon: ({ color } : { color : string }) => <TabBarIcon name="account-arrow-right" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
