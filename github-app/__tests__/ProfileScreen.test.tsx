/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import axios from 'axios';
// import { render, fireEvent } from '@testing-library/react-native/';
import ProfileScreen from '../screens/ProfileScreen';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('renders normal response correctly', async () => {
  mockedAxios.post.mockResolvedValue({
    data: {
      data: {
        user: {
          avatarUrl: 'https://avatars.githubusercontent.com/u/31669157?s=200&u=6b0e5bb8e1425816f333d5889d0538300938d302&v=4',
          name: 'a',
          login: 'b',
          bio: 'c',
          websiteUrl: 'd',
          email: 'e',
          following: {
            totalCount: 1,
          },
          followers: {
            totalCount: 2,
          },
          createdAt: '9/5/2017',
          repositories: {
            totalCount: 3,
          },
        },
      },
    },
  });
  let tree : renderer.ReactTestRenderer | undefined;
  const navigation : any = { navigate: jest.fn() };
  const route: any = { params: { login: jest.fn() } };
  await act(async () => {
    tree = renderer.create(<ProfileScreen navigation={navigation} route={route} />);
  });
  expect(tree?.toJSON()).toMatchSnapshot();
});

test('renders undefined response with activity indicator', async () => {
  mockedAxios.post.mockResolvedValue(undefined);
  let tree : renderer.ReactTestRenderer | undefined;
  const navigation : any = { navigate: jest.fn() };
  const route: any = { params: { login: jest.fn() } };
  await act(async () => {
    tree = renderer.create(<ProfileScreen navigation={navigation} route={route} />);
  });
  expect(tree?.toJSON()).toMatchSnapshot();
});

test('renders undefined error response with error message', async () => {
  mockedAxios.post.mockRejectedValue(new Error('Some Error Occurred'));
  let tree : renderer.ReactTestRenderer | undefined;
  const navigation : any = { navigate: jest.fn() };
  const route: any = { params: { login: jest.fn() } };
  await act(async () => {
    tree = renderer.create(<ProfileScreen navigation={navigation} route={route} />);
  });
  expect(tree?.toJSON()).toMatchSnapshot();
});
