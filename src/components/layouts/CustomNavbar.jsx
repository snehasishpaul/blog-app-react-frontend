import { useContext, useEffect, useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { toast } from "react-toastify";
import AuthContext from "../context/auth-context";
import classes from "./CustomNavbar.module.css";
import logo from "../../images/logo.png";
import useAxios from "../hooks/useAxios";
import { LoadingSpinnerDNA } from "../utils/LoadingSpinner";

const CustomNavbar = () => {
  const authContext = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  const { myAxios } = useAxios();

  useEffect(() => {
    setIsLogin(authContext.isLoggedIn());
    setUser(authContext.getCurrentUserDetail());
  }, [authContext.isLoggedInState]);

  const toggle = () => setIsOpen(!isOpen);

  async function logoutHandler() {
    try {
      setIsLoading(true);
      await myAxios.post("/api/v1/auth/logout");
      console.log("cookies cleared");

      authContext.doLogout(() => {
        console.log("logout successful");
      });
      toast.success("Logout Successful");
      setIsLogin(false);
      //redirect to login page
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error htting URL", error);
      toast.error(
        `${error.message} - ${error.code} - ${error.response.status}`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className=" bg-indigo-950 shadow-2xl shadow-black">
      <Navbar dark expand="md" className="px-5">
        <NavbarBrand tag={ReactLink} to="/">
          <img src={logo} alt="logo" className="w-20" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                Home
              </NavLink>
            </NavItem>
            {isLogin && (
              <NavItem>
                <NavLink tag={ReactLink} to="user/news-feed">
                  News Feed
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink tag={ReactLink} to="/services">
                Services
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/contact-us">
                Contact Us
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            {!isLogin ? (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink
                    className="bg-blue-900 rounded-2xl"
                    tag={ReactLink}
                    to="/user/dashboard"
                  >
                    {user.name.toUpperCase()}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/profile">
                    My Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    // tag={ReactLink}
                    onClick={logoutHandler}
                    className={classes.logoutBtn}
                  >
                    {isLoading ? <LoadingSpinnerDNA h={20} w={20} /> : "Logout"}
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
