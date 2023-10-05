import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchSection = () => {
  const [startDate, setStartDate] = useState(null);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} lg={7}>
          <Form>
            <div className="searchbar d-block d-md-flex justify-content-center bg-white py-1 px-1 rounded-3">
              <div className="bg-white d-flex rounded-3 py-2 ps-1 text-start w-100">
                <div>
                  <i className="bi bi-suitcase fs-3" style={{ color: "#2170D9" }}></i>
                </div>
                <div className="align-self-center w-100 me-1">
                  <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Col lg={12}>
                      <Form.Control type="text" placeholder=" Where do you want to go?" />
                    </Col>
                  </Form.Group>
                </div>
              </div>

              <div className="bg-white d-flex rounded-3 mx-1 py-2 w-100 me-0">
                <div className="ps-1">
                  <i className="bi bi-calendar-check fs-3 pe-1" style={{ color: "#0CC945" }}></i>
                </div>
                <div className="align-self-center ">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Choose date"
                    className="form-control"
                  />
                </div>
              </div>

              <div>
                <Button className="ms-1 h-100 fs-3" typer="submit" style={{ backgroundColor: "#203040" }}>
                  <Search className="pb-1" />
                </Button>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchSection;
