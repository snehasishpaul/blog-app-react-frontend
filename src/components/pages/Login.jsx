import { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import { doLogin } from "../auth/auth";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    error: {},
  });

  const inputChangeHandler = (event, field) => {
    setUserData((prevData) => {
      return { ...prevData, [field]: event.target.value };
    });
  };

  const loginRequest = async (userData) => {
    try {
      const response = await fetch("http://localhost:9090/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(userData),
      });

      const respData = await response.json();

      if (!response.ok) {
        // if (response.status === 404) {
        //   toast.error("404 ERROR !! Something went wrong !!!");
        //   return;
        // }
        setError({
          ...respData,
        });
        for (let field in respData) {
          toast.error(respData[field]);
        }
        throw new Error(response.status);
      }
      console.log(respData);
      toast.success("Login Successful");
      doLogin(respData, () => {
        console.log("Login details are saved to localstorage");
      });
      resetHandler();
    } catch (error) {
      console.error(error);
      toast.error(error);
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
      toast.error("Something went wrong !!");
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
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>Login Credentials:</CardHeader>
              <CardBody>
                <Form>
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
                    />
                    <FormFeedback>{error?.password}</FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button
                      onClick={submitHandler}
                      color="success"
                      type="submit"
                    >
                      Login
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
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
