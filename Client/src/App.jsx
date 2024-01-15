import "./App.css";
import { Outlet } from "react-router-dom";

import Providers from "./context/Providers";
function App() {
  return (
    <Providers>
      <div className="App">
        <Outlet />
      </div>
    </Providers>
  );
}

export default App;
