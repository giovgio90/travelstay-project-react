import BestRooms from "./BestRooms";
import Deluxe from "./Deluxe";
import FooterTravelStay from "./FooterTravelStay";
import Header from "./Header";
import IntroSection from "./IntroSection";
import MainSection from "./MainSection";
import NewsletterSignup from "./NewsletterSignup";

const HomePage = () => {
  return (
    <>
      <header className="header-background position-relative">
        <Header />
        <MainSection />
      </header>

      <IntroSection />
      <Deluxe />
      <BestRooms />
      <NewsletterSignup />
      <FooterTravelStay />
    </>
  );
};

export default HomePage;
