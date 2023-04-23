import { QueryResponse } from 'app/types';
import axios from 'axios';

export const DOMAIN = 'http://localhost:4000/api';

const client = axios.create({
  baseURL: DOMAIN,
});
client.interceptors.request.use(
  config => {
    config.headers.set('username', localStorage.getItem('username'));
    config.headers.set('password', localStorage.getItem('password'));
    return config;
  },
  err => console.log(err),
);

export const executeSelectQuery = async (
  query: string,
): Promise<QueryResponse> => {
  const res = await client.post(`/query`, {
    query: query,
  });
  const result: QueryResponse = res.data;
  const mapped: any[] = [];
  for (let i = 0; i < result.rows.length; i++) {
    const row = result.rows[i];
    const data = {};
    for (let j = 0; j < row.length; j++) {
      data[result.metaData[j].name] = row[j];
    }
    mapped.push(data);
  }
  return {
    metaData: result.metaData,
    rows: mapped,
  };
};

export const login = async (username: string, password: string) => {
  const res = await client.post(`/login`, {
    username: username,
    password: password,
  });
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  return res;
};

export const logout = async () => {
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  return;
};
