import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import OffersPage from "./components/OffersPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import OfferDetail from "./components/OfferDetail";
import LoginTravel from "./components/LoginTravel";
import Cart from "./components/Cart";
import RegisterPage from "./components/RegisterPage";
import SearchResults from "./components/SearchResults";
import OfferStayDetail from "./components/OfferStayDetail";
import ContactPage from "./components/ContactPage";
import AboutUsPage from "./components/AboutUsPage";
import Favourites from "./components/Favourites";
import RoomDetail from "./components/RoomDetail";
import TourDetail from "./components/TourDetail";
import DeluxeOfferDetail from "./components/DeluxeOfferDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginTravel />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/room-detail/:id" element={<RoomDetail />} />
          <Route path="/tour-detail/:tourId" element={<TourDetail />} />
          <Route path="/deluxe-detail/:deluxeId" element={<DeluxeOfferDetail />} />
          <Route path="/preferiti" element={<Favourites />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/results/:query" element={<SearchResults />} />
          <Route path="/explore" element={<OffersPage />} />
          <Route path="/explore/:id" element={<OfferDetail />} />
          <Route path="/stay-offer/:stayId" element={<OfferStayDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
