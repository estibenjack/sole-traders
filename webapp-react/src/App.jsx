import { Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import BrowseTradersPage from './pages/BrowseTradersPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './components/ui/MainLayout';
import FullHeightLayout from './components/ui/FullHeightLayout';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
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
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default App;
