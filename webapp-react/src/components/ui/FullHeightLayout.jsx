import AuthNavbar from './AuthNavbar';
import Footer from './Footer';

const FullHeightLayout = ({ children, variant }) => {
  return (
    <div className="full-height-page">
      <AuthNavbar variant={variant} />
      {children}
      <Footer />
    </div>
  );
};

export default FullHeightLayout;
