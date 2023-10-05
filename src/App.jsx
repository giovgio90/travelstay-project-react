import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import OffersPage from "./components/OffersPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import OfferDetail from "./components/OfferDetail";
import LoginTravel from "./components/LoginTravel";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginTravel />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<OffersPage />} />
          <Route path="/explore/:id" element={<OfferDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
