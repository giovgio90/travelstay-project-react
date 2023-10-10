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
        <h1 className="text-white fw-bold mb-0">SCOPRI</h1>
        <h2 className="text-white">il tuo soggiorno da sogno!</h2>

        <SearchSection />
      </div>
    </>
  );
};

export default MainSection;
