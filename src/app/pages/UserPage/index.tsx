import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { executeSelectQuery } from 'app/api';
import { QueryResponse } from 'app/types';
import { useEffect, useState } from 'react';

export const UserPage = props => {
  const [response, setResponse] = useState<QueryResponse>();

  useEffect(() => {
    executeSelectQuery('SELECT * FROM PDT.SINHVIEN').then(
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
