import React from 'react';
import { Users } from './Users';
import { act, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

interface ITestResponse {
  data: Array<{ id: number, name: string }>
}

describe('Users-test', () => {
  let response: ITestResponse;

  beforeEach(() => {
    response = {
      data: [
        {
          id: 1,
          name: 'Leanne Graham'
        },
        {
          id: 2,
          name: 'Ervin Howell'
        },
        {
          id: 3,
          name: 'Clementine Bauch'
        }
      ]
    };
  });

  it('Wait state change', async () => {
    mockedAxios.get.mockResolvedValue(response);

    let component: any;
    await act(async () => {
      component = render(<Users />)
    });

      const userList = await screen.findAllByTestId('div-item');
      expect(axios.get).toBeCalledTimes(1);
      expect(userList).toHaveLength(3);
      expect(userList[0]).toHaveTextContent('Leanne Graham');
      expect(userList[1]).toHaveTextContent('Ervin Howell');
      expect(userList[2]).toHaveTextContent('Clementine Bauch');
      screen.debug();
  });
});
