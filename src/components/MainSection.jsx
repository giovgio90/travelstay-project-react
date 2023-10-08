import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchSection from "./SearchSection";
import { useEffect, useState } from "react";

const MainSection = () => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const homeClassName = isSticky ? "home-sticky" : "home-no-sticky";

  return (
    <>
      <div className={homeClassName}>
        <h1 className="text-white fw-bold mb-0">DISCOVER</h1>
        <h2 className="text-white">your dream stay.</h2>
        <Link to="/explore">
          <Button variant="primary" size="lg" className="btn-explore mt-4 rounded-5 px-5 ">
            EXPLORE NOW
          </Button>
        </Link>
        <SearchSection />
      </div>
    </>
  );
};

export default MainSection;
