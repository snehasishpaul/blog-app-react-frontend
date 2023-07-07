import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import parsley from "parsleyjs";
import jquery from "jquery";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
// import AuthContext from "../context/auth-context";
import useAuth from "../hooks/useAuth";
import Cookies from "universal-cookie";
// import Cookies from "js-cookie";

const Login = (props) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const { callApi, error, setError } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const loginForm = useRef();
  const navigate = useNavigate();
  // const authContext = useContext(AuthContext);
  const authContext = useAuth();
  const cookies = new Cookies();

  useEffect(() => {
    jquery(loginForm.current).parsley();
  }, []);

  const inputChangeHandler = (event, field) => {
    setUserData((prevData) => {
      return { ...prevData, [field]: event.target.value };
    });
  };

  const loginRequest = async (userData) => {
    setIsLoading(true);
    try {
      let respData = await callApi("/api/auth/login", "POST", userData);

      // cookies.set("token", respData.token, {
      //   path: "/",
      //   // expires: new Date(5 * 60 * 60 * 1000),
      //   // httpOnly: true,
      //   secure: true,
      // }); //universal-cookie

      // Cookies.set("jwt_token", respData.token, { secure: true });  //js-cookie

      console.log(respData);
      toast.success("Login Successful");
      authContext.doLogin(respData, () => {
        console.log("Login details are saved to localstorage");

        resetHandler();
        //redirect to user dashboard
        navigate("/user/dashboard", { replace: true });
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    try {
      if (userData.username.trim() === "" || userData.password.trim() === "") {
        toast.error("Username OR Password must not be Empty !!");
        setError({
          username: "Username must not be empty",
          password: "Password must not be empty",
        });
        return;
      }
      loginRequest(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const resetHandler = () => {
    setUserData({
      username: "",
      password: "",
    });
    setError({});
  };

  return (
    <>
      <div className="container py-52">
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card className="">
              <CardHeader className="text-black ">
                Login Credentials:
              </CardHeader>
              <CardBody>
                <form
                  ref={loginForm}
                  onSubmit={submitHandler}
                  data-parsley-validate
                  data-parsley-focus="none"
                  noValidate
                >
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Email"
                      type="email"
                      onChange={(e) => inputChangeHandler(e, "username")}
                      value={userData.username}
                      invalid={error?.username ? true : false}
                      data-parsley-trigger="focusout"
                      data-parsley-required-message="Email is required."
                      required
                      disabled={isLoading}
                      autoFocus
                    />
                    <FormFeedback>{error?.username}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={(e) => inputChangeHandler(e, "password")}
                      value={userData.password}
                      invalid={error?.password ? true : false}
                      data-parsley-trigger="focusout"
                      data-parsley-required-message="Password is required."
                      required
                      disabled={isLoading}
                    />
                    <FormFeedback>{error?.password}</FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="success" type="submit">
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    <Button
                      onClick={resetHandler}
                      color="warning"
                      className="ms-2"
                      type="reset"
                    >
                      Reset
                    </Button>
                  </Container>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
