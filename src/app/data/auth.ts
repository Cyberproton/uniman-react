import { getConnection } from 'oracledb';
import { CONNECTION_STRING } from './database';

export const login = async (username: string, password: string) => {
  let connection;
  try {
    connection = await getConnection({
      user: username,
      password: password,
      connectString: CONNECTION_STRING,
    });
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

export const logout = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('password');
};
