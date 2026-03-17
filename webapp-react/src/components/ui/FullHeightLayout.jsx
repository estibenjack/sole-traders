import Navbar from './Navbar';
import Footer from './Footer';

const FullHeightLayout = ({ children }) => {
  return (
    <div className="full-height-page">
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default FullHeightLayout;
