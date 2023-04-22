import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = props => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box my={6} textAlign={'center'} alignItems={'center'}>
        <Typography variant="h3" textAlign={'center'} mb={3} color={'error'}>
          404
        </Typography>
        <Typography variant="h5" textAlign={'center'}>
          Không tìm thấy trang web. Vui lòng thử lại
        </Typography>
        <Button
          sx={{ my: 3 }}
          variant="contained"
          onClick={() => navigate('/')}
        >
          Về trang chủ
        </Button>
      </Box>
    </Container>
  );
};
