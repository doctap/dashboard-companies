import React from 'react';
import { Users } from './Users';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

interface ITestResponse {
  data: Array<{ id: number, name: string }>
}

describe('Users-test', () => {
  const renderComponent = () => (render(<Users />));
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

  test('users request', async () => {
    mockedAxios.get.mockResolvedValue(response);
    render(<Users/>);
    const { getAllByRole } = renderComponent();

    await waitFor(() => {
      const userList = getAllByRole('listitem');
      expect(userList).toHaveLength(3);
      expect(userList[0]).toHaveTextContent('Leanne Graham');
      expect(userList[1]).toHaveTextContent('Ervin Howell');
      expect(userList[2]).toHaveTextContent('Clementine Bauch');
    });
  });
});
