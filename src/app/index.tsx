import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppBreadcrumbs } from './components/Breadcrumbs';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

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

const MainLayout = props => {
  return (
    <>
      <NavBar />
      <Container>
        <Box my={3}>
          <Box mt={3} mb={6}>
            <AppBreadcrumbs />
          </Box>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
};

export default App;
