import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridRowModel } from '@mui/x-data-grid';
import { executeQuery, executeSelectQuery } from 'app/api';
import { QueryResponse, TranscriptData, TranscriptsFilter } from 'app/types';
import { isNumeric } from 'app/utils';
import { useState, useEffect, useCallback } from 'react';

export const TranscriptsPage = props => {
  const [response, setResponse] = useState<QueryResponse>();
  const [updated, setUpdated] = useState<any[]>();
  const [openInsert, setOpenInsert] = useState(false);
  const [insertStudentData, setInsertStudentData] = useState<TranscriptData>();
  const [filter, setFilter] = useState<TranscriptsFilter>({
    HK221: true,
    HK222: true,
  });
  const metadata = response?.metaData;
  const origin = response?.rows;

  const refresh = () => {
    executeSelectQuery(
      'SELECT * FROM PDT.BANGDIEMMONHOC BD JOIN PDT.LOPHOC LH ON BD.MALOP = LH.MALOP',
    ).then(
      data => {
        setResponse(data);
        setUpdated(data.rows);
      },
      err => alert(err.response.data.message),
    );
  };

  const handleClickOpenInsert = () => {
    setOpenInsert(true);
  };

  const handleCloseInsert = () => {
    setOpenInsert(false);
  };

  const canInsert = useCallback(() => {
    return (
      insertStudentData?.MASV != null &&
      insertStudentData.MALOP != null &&
      insertStudentData.DIEMGIUAKY != null &&
      insertStudentData.DIEMCUOIKY != null &&
      insertStudentData.DIEMTONGKET != null
    );
  }, [insertStudentData]);

  const handleInsert = useCallback(() => {
    executeQuery(
      `INSERT INTO PDT.BANGDIEMMONHOC (MASV, MALOP, DIEMGIUAKY, DIEMCUOIKY, DIEMTONGKET) VALUES ('${insertStudentData?.MASV}','${insertStudentData?.MALOP}',${insertStudentData?.DIEMGIUAKY},${insertStudentData?.DIEMCUOIKY},${insertStudentData?.DIEMTONGKET})`,
    ).then(
      data => {
        refresh();
      },
      err => alert(err.response.data.message),
    );
  }, [insertStudentData]);

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
    refresh();
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
        if (typeof sb === 'number' || isNumeric(sb)) {
          set.push(`${metadata[j].name}=${sb}`);
        } else {
          set.push(`${metadata[j].name}='${sb}'`);
        }
      }
    }

    if (set.length === 0) {
      continue;
    }

    query.push(
      `UPDATE PDT.BANGDIEMMONHOC SET ${set.join(', ')} WHERE MASV='${
        a['MASV']
      }' AND MALOP='${a['MALOP']}'`,
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
        <Typography mr={3}>Thực hiện</Typography>
        <Button variant="outlined" onClick={handleClickOpenInsert}>
          Insert
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', my: 3, gap: 2 }}>
        <Typography mr={3}>Bộ lọc</Typography>
        <Chip
          label="HK221"
          color="primary"
          variant={filter.HK221 ? 'filled' : 'outlined'}
          onClick={() => {
            setFilter({
              ...filter,
              HK221: !filter.HK221,
            });
          }}
        />
        <Chip
          label="HK222"
          color="primary"
          variant={filter.HK222 ? 'filled' : 'outlined'}
          onClick={() => {
            setFilter({
              ...filter,
              HK222: !filter.HK222,
            });
          }}
        />
      </Box>

      <Dialog open={openInsert} onClose={handleCloseInsert}>
        <DialogTitle>Chạy Insert trên bảng điểm</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Mã sinh viên"
            fullWidth
            onChange={e =>
              setInsertStudentData({
                ...insertStudentData,
                MASV: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Mã lớp"
            fullWidth
            onChange={e =>
              setInsertStudentData({
                ...insertStudentData,
                MALOP: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Điểm giữa kỳ"
            fullWidth
            onChange={e =>
              setInsertStudentData({
                ...insertStudentData,
                DIEMGIUAKY: Number.parseFloat(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="Điểm cuối kỳ"
            type="number"
            fullWidth
            onChange={e =>
              setInsertStudentData({
                ...insertStudentData,
                DIEMCUOIKY: Number.parseFloat(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="Điểm tổng kết"
            fullWidth
            onChange={e =>
              setInsertStudentData({
                ...insertStudentData,
                DIEMTONGKET: Number.parseFloat(e.target.value),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseInsert}>
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={() => handleInsert()}
            disabled={!canInsert()}
          >
            Insert
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {query.map((q, i) => (
            <Typography key={i} fontWeight={'bold'} color={'primary'}>
              {q}
            </Typography>
          ))}
          {query.length !== 0 ? (
            <Button
              variant="contained"
              size="small"
              disabled={query.length === 0}
              onClick={() => {
                executeQuery(query[0]).then(
                  d => {
                    executeSelectQuery(
                      'SELECT * FROM PDT.BANGDIEMMONHOC BD JOIN PDT.LOPHOC LH ON BD.MALOP = LH.MALOP',
                    ).then(
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
      </Box>
      <DataGrid
        rows={response.rows
          .filter(r => {
            if (!filter.HK221 && r.HOCKY === '221') {
              return false;
            }
            if (!filter.HK222 && r.HOCKY === '222') {
              return false;
            }
            return true;
          })
          .map((r, i) => ({ ...r, id: i }))}
        columns={response.metaData.map(metadata => ({
          field: metadata.name,
          width: 130,
          editable: true,
        }))}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
};
