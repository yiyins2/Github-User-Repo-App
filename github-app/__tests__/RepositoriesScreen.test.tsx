/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import axios from 'axios';
import RepositoriesScreen from '../screens/RepositoriesScreen';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('renders normal response correctly', async () => {
  mockedAxios.post.mockResolvedValue({
    data: {
      data: {
        user: {
          repositories: {
            totalCount: 2,
            nodes: [
              {
                name: 'a',
                owner: {
                  login: 'b',
                },
                description: 'c',
              },
              {
                name: 'd',
                owner: {
                  login: 'e',
                },
                description: 'f',
              },
            ],
          },
        },
      },
    },
  });
  let tree : renderer.ReactTestRenderer | undefined;
  const navigation : any = { navigate: jest.fn() };
  const route: any = { params: { login: jest.fn() } };
  await act(async () => {
    tree = renderer.create(<RepositoriesScreen navigation={navigation} route={route} />);
  });
  expect(tree?.toJSON()).toMatchSnapshot();
});

test('renders undefined response with activity indicator', async () => {
  mockedAxios.post.mockResolvedValue(undefined);
  let tree : renderer.ReactTestRenderer | undefined;
  const navigation : any = { navigate: jest.fn() };
  const route: any = { params: { login: jest.fn() } };
  await act(async () => {
    tree = renderer.create(<RepositoriesScreen navigation={navigation} route={route} />);
  });
  expect(tree?.toJSON()).toMatchSnapshot();
});

test('renders undefined error response with error message', async () => {
  mockedAxios.post.mockRejectedValue(new Error('Some Error Occurred'));
  let tree : renderer.ReactTestRenderer | undefined;
  const navigation : any = { navigate: jest.fn() };
  const route: any = { params: { login: jest.fn() } };
  await act(async () => {
    tree = renderer.create(<RepositoriesScreen navigation={navigation} route={route} />);
  });
  expect(tree?.toJSON()).toMatchSnapshot();
});
