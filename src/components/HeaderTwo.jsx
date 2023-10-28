import { Badge, Col, Container, Form, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import { AirplaneFill, Cart3, EnvelopeFill, HouseFill, PersonCircle, PersonFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../redux/actions";

const HeaderTwo = () => {
  const dispatch = useDispatch();
  const cartItemsTravel = useSelector((state) => state.cart.cartItemsTravel);
  const cartItemsStay = useSelector((state) => state.cart.cartItemsStay);
  const cartItemsRoom = useSelector((state) => state.cart.cartItemsRoom);
  const cartItemsTour = useSelector((state) => state.cart.cartItemsTour);
  const cartItemsDeluxe = useSelector((state) => state.cart.cartItemsDeluxe);
  const cartItemCount =
    cartItemsTravel.length +
    cartItemsStay.length +
    cartItemsRoom.length +
    cartItemsTour.length +
    cartItemsDeluxe.length;
  const username = useSelector((state) => state.user.username);
  const handleLogout = () => {
    dispatch(setUser(null));
  };
  return (
    <Navbar expand="lg" className="navbar-head py-0" style={{ zIndex: "1000" }}>
      <Container>
        <Navbar.Brand className="d-flex align-center ms-2 me-0 ps-auto">
          <img src={Logo} width="80" height="80" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-sm-center mx-lg-auto">
            <Nav.Link className="pe-lg-5 d-flex justify-content-center" href="/">
              <div className="d-flex align-items-center">
                <HouseFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                <h4 className="nav-link  mb-0">HOME</h4>
              </div>
            </Nav.Link>
            <Nav.Link className=" pe-lg-5 d-flex justify-content-center" href="/about-us">
              <div className="d-flex align-items-center">
                <PersonFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                <h4 className="nav-link  mb-0"> CHI SIAMO</h4>
              </div>
            </Nav.Link>

            <Nav.Link className="pe-lg-5 d-flex justify-content-center" href="/explore">
              <div className="d-flex align-items-center">
                <AirplaneFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                <h4 className="nav-link  mb-0">OFFERTE</h4>
              </div>
            </Nav.Link>
            <Nav.Link className=" pe-lg-5 d-flex justify-content-center" href="/contact">
              <div className=" d-flex align-items-center">
                <EnvelopeFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                <h4 className="nav-link  mb-0"> CONTATTI</h4>
              </div>
            </Nav.Link>
          </Nav>
          <Form className="d-flex justify-content-center">
            <Row>
              <Col>
                {username ? (
                  <>
                    <div className="nav-link d-flex align-items-center">
                      <Nav.Link href="/cart">
                        <div className="d-flex align-items-center position-relative">
                          <Cart3 className="nav-link me-4" style={{ fontSize: "1.7rem" }} />
                          {cartItemCount > 0 && (
                            <Badge
                              pill
                              bg="danger"
                              className="cart-badge position-absolute top-0 end-0 translate-middle"
                            >
                              {cartItemCount}
                            </Badge>
                          )}
                        </div>
                      </Nav.Link>
                      <PersonCircle className="me-2 text-white" style={{ fontSize: "1.5rem" }} />
                      <NavDropdown title={username.username} id="basic-nav-dropdown">
                        <NavDropdown.Item
                          className="text-white"
                          as={Link}
                          to="/preferiti"
                          style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "600" }}
                        >
                          Preferiti
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                          className="text-white"
                          as={Link}
                          onClick={handleLogout}
                          to="/login"
                          style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "600" }}
                        >
                          Esci
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-flex">
                      <Nav.Link className="pe-lg-4 text-white" href="/login">
                        ACCEDI
                      </Nav.Link>
                      <Nav.Link className="pe-lg-4 text-white" href="/register">
                        REGISTRATI
                      </Nav.Link>
                    </div>
                  </>
                )}
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderTwo;
