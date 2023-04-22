import { School } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const AppTitle = (props: AppTitleProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: props.center ? 'center' : undefined,
        mx: props.mx,
        my: props.my,
      }}
    >
      <School fontSize="large" color="primary" />
      <Typography mx={2} variant="h5" color={'primary'} fontWeight={'bold'}>
        UniMan
      </Typography>
    </Box>
  );
};

export interface AppTitleProps {
  center?: boolean;
  mx?: number;
  my?: number;
}
