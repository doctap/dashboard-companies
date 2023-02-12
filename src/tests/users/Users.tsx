import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number
  name: string
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const data: User[] = response.data.map((v: any) => v.id);
      setUsers(data);
    } catch (e: any) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div role='listitem'>
      {users.map(v => <div key={v.id}>{v.name}</div>)}
    </div>
  );
};
