import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { CurrencyEuro } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const SearchSection = () => {
  const [startDate, setStartDate] = useState(null);
  const [budget, setBudget] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleBudgetChange = (e) => {
    const value = parseFloat(e.target.value);
    setBudget(value);
  };

  const handleSearchQueryChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedStartDate = startDate ? formatDate(startDate) : "";

  return (
    <Form className="mb-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="searchbar d-block  d-md-flex py-1 py-md-2 py-lg-4 mt-5">
        <Container>
          <Row className="mx-auto align-items-center">
            <Col xs={12} lg={4}>
              <div className="d-flex rounded-3 py-2  mx-1 text-start w-100">
                <div>
                  <i className="bi bi-suitcase fs-3 pe-3" style={{ color: "#2170D9" }}></i>
                </div>
                <div className="align-self-center w-100 me-1">
                  <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Control type="text" placeholder="Dove vuoi andare?" onChange={handleSearchQueryChange} />
                  </Form.Group>
                </div>
              </div>
            </Col>
            <Col xs={6} md={4} lg={3}>
              <div className="d-flex py-2 mx-1 me-0">
                <div className="ps-1">
                  <CurrencyEuro className="bi bi-cash-stack fs-1 pe-0" style={{ color: "#FF8C00" }} />
                </div>
                <div className="align-self-center w-100">
                  <Form.Control
                    type="number"
                    placeholder="Budget"
                    value={budget}
                    onChange={handleBudgetChange}
                    className="form-control"
                  />
                </div>
              </div>
            </Col>
            <Col xs={6} md={4} lg={3}>
              <div className="d-flex mx-1 py-2 me-0 ">
                <div className="ps-1">
                  <i className="bi bi-calendar-check fs-3 pe-2" style={{ color: "#0CC945" }}></i>
                </div>
                <div className="align-self-center">
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Scegli la data"
                    className="form-control "
                  />
                </div>
              </div>
            </Col>
            <Col xs={12} md={4} lg={2} className="align-self-center">
              <div>
                <Link
                  to={searchQuery ? `/results/${searchQuery}?budget=${budget}&startDate=${formattedStartDate}` : "#"}
                  style={{ textDecoration: "none" }}
                >
                  <Button className="ms-1 h-100 py-2 px-5 button-search" type="button">
                    <h5 className="mb-0">Cerca</h5>
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Form>
  );
};

export default SearchSection;
