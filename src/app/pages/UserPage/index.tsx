import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridValueGetterParams,
  useGridApiContext,
} from '@mui/x-data-grid';
import { executeSelectQuery, executeQuery } from 'app/api';
import { QueryResponse, RowUpdate } from 'app/types';
import { useCallback, useEffect, useState } from 'react';

const modalStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const UserPage = props => {
  const [response, setResponse] = useState<QueryResponse>();
  const [updated, setUpdated] = useState<any[]>();
  const metadata = response?.metaData;
  const origin = response?.rows;

  const processRowUpdate = useCallback(
    (newRow: GridRowModel, _: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const u = [...updated!];
        u![newRow.id] = newRow;
        setUpdated(u);
        resolve(newRow);
      }),
    [updated],
  );

  useEffect(() => {
    executeSelectQuery('SELECT * FROM PDT.SINHVIEN').then(
      data => {
        setResponse(data);
        setUpdated(data.rows);
      },
      err => alert(err.response.data.message),
    );
  }, []);

  if (
    response == null ||
    updated == null ||
    origin == null ||
    metadata == null
  ) {
    return <Box>Loading</Box>;
  }

  const query: string[] = [];
  for (let i = 0; i < origin.length; i++) {
    const a = origin[i];
    const b = updated[i];

    const set: string[] = [];

    for (let j = 0; j < metadata.length; j++) {
      const sa = a[metadata[j].name];
      const sb = b[metadata[j].name];
      if (sa !== sb) {
        set.push(`${metadata[j].name}='${sb}'`);
      }
    }

    if (set.length === 0) {
      continue;
    }

    query.push(
      `UPDATE PDT.SINHVIEN SET ${set.join(', ')} WHERE MASV='${a['MASV']}'`,
    );
  }

  return (
    <Box>
      <Box>
        <Typography my={3}>SQL</Typography>
        {query.map((q, i) => (
          <Typography key={i} fontWeight={'bold'} color={'primary'}>
            {q}
          </Typography>
        ))}
        {query.length !== 0 ? (
          <Button
            variant="contained"
            disabled={query.length === 0}
            onClick={() => {
              executeQuery(query[0]).then(
                d => {
                  executeSelectQuery('SELECT * FROM PDT.SINHVIEN').then(
                    data => {
                      setResponse(data);
                      setUpdated(data.rows);
                    },
                    err => alert(err.response.data.message),
                  );
                },
                err => alert(err.response.data.message),
              );
            }}
            sx={{ my: 3 }}
          >
            Update
          </Button>
        ) : undefined}
      </Box>
      <DataGrid
        rows={updated.map((r, i) => ({ ...r, id: i }))}
        columns={metadata.map(metadata => ({
          field: metadata.name,
          width: 130,
          editable: true,
        }))}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
};
