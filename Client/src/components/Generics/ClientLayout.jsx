import "../../App.css";

import Header from "./Header";
import Footer from "./Footer";
function ClientLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default ClientLayout;
