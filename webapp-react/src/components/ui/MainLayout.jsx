import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="full-height-page">
      <Navbar />
      <main className="main-content-wrapper">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
