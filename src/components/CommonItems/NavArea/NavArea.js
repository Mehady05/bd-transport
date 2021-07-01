import React from "react";
import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../App";
import "./NavArea.css";

const NavArea = () => {

  const history = useHistory();

  const goLogin =()=>{
    history.push('/contact')
  }

  const [login, setLogin] = useContext(UserContext);
  const handleLogOut = ()=>{
    setLogin({})
  }
  return (
    <div className="navbar_area">

      <React.Fragment>
        <Navbar
          collapseOnSelect
          expand="lg"
        >
          <div className="container">
            <Navbar.Brand as={Link} to="/">
              React-Bootstrap
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav activeKey={window.location.pathname} variant="pills" className="ml-auto">
                <Nav.Item href="/">
                  <Nav.Link as={Link} to="/" eventKey="/home" title="Home">
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/destination" title="Destination">
                    Destination
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/blog"
                    eventKey="blog"
                    title="Blog"
                  >
                    Blog
                  </Nav.Link>
                </Nav.Item>
                <Nav.Link as={Link} to="/contact" title="Contact">
                  Contact
                </Nav.Link>
              </Nav>
              {login.email ?
              <button onClick={handleLogOut}>LogOut</button>:<button onClick={goLogin}>LogIn</button>}
            </Navbar.Collapse>
          </div>

        </Navbar>
      </React.Fragment>
    </div>

  );
};

export default NavArea;
