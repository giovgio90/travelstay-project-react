import { Spinner } from "react-bootstrap";

const LoadingFive = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "11rem",
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner animation="grow" variant="dark" />
      <Spinner animation="grow" variant="dark" style={{ marginInline: "20px" }} />
      <Spinner animation="grow" variant="dark" />
    </div>
  );
};

export default LoadingFive;
