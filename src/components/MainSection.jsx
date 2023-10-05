import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainSection = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-white fw-bold mb-0">DISCOVER</h1>
        <h2 className="text-white">your dream stay.</h2>
        <Link to="/explore">
          <Button variant="primary" size="lg" className="btn-explore mt-4 rounded-5 px-5 ">
            EXPLORE NOW
          </Button>
        </Link>
      </div>
    </>
  );
};

export default MainSection;
