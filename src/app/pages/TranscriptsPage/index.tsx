import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { executeSelectQuery } from 'app/api';
import { QueryResponse } from 'app/types';
import { useState, useEffect } from 'react';

export const TranscriptsPage = props => {
  const [response, setResponse] = useState<QueryResponse>();

  useEffect(() => {
    executeSelectQuery('SELECT * FROM PDT.BANGDIEMMONHOC').then(
      data => {
        setResponse(data);
      },
      err => console.log(err.response),
    );
  }, []);

  if (response == null) {
    return <Box>Loading</Box>;
  }

  return (
    <DataGrid
      rows={response.rows.map((r, i) => ({ ...r, id: i }))}
      columns={response.metaData.map(metadata => ({
        field: metadata.name,
        width: 130,
      }))}
    />
  );
};
