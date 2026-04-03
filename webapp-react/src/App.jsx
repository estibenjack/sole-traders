import { Routes, Route } from 'react-router-dom';
import BrowseTradersPage from './pages/BrowseTradersPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './components/ui/MainLayout';
import FullHeightLayout from './components/ui/FullHeightLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TraderProfilePage from './pages/TraderProfilePage';

const App = () => {
  return (
    <>
      {/* todo: refactor to use createBrowserRouter */}
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              {/* <div
                className="error-404-container"
                style={{ flexDirection: 'column' }}
              >
                <h2
                  style={{
                    color: 'white',
                    fontFamily: 'var(--special-font)',
                    fontSize: '2.5rem'
                  }}
                >
                  Home page coming soon 🚧
                </h2>
                <p style={{ color: '#aaa', fontSize: '1.1rem' }}>
                  Check back in a bit!
                </p>
              </div> */}
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/traders"
          element={
            <MainLayout>
              <BrowseTradersPage />
            </MainLayout>
          }
        />
        <Route
          path="*"
          element={
            <FullHeightLayout>
              <NotFoundPage />
            </FullHeightLayout>
          }
        />
        <Route
          path="/traders/:id"
          element={
            <MainLayout>
              <TraderProfilePage />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <FullHeightLayout>
              <LoginPage />
            </FullHeightLayout>
          }
        />
        <Route
          path="/register"
          element={
            <FullHeightLayout>
              <RegisterPage />
            </FullHeightLayout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
