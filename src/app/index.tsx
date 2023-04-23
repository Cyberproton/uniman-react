import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppBreadcrumbs } from './components/Breadcrumbs';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UserPage } from './pages/UserPage';
import { TranscriptsPage } from './pages/TranscriptsPage';

export const App = () => {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - UniMan" defaultTitle="UniMan">
        <meta name="description" content="UniMan" />
      </Helmet>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

const routeNames = {
  '/': 'Trang chủ',
  '/user': 'Thông tin người dùng',
  '/transcripts': 'Bảng điểm',
};

const MainLayout = props => {
  return (
    <>
      <NavBar />
      <Box my={3} mx={3}>
        <Box mt={3} mb={6}>
          <AppBreadcrumbs names={routeNames} />
        </Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transcripts" element={<TranscriptsPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
