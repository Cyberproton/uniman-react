import * as oracledb from 'oracledb';

export const CONNECTION_STRING = 'localhost/EE';

export const getConnection = async () => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  if (username == null || password == null) {
    throw new Error('You must be logged in to perform this action');
  }

  return oracledb.getConnection({
    user: username,
    password: password,
    connectString: CONNECTION_STRING,
  });
};

export const getConnectionAsDba = async () => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  if (username == null || password == null) {
    throw new Error('You must be logged in to perform this action');
  }

  return oracledb.getConnection({
    user: username,
    password: password,
    connectString: CONNECTION_STRING,
    privilege: oracledb.SYSDBA,
  });
};
