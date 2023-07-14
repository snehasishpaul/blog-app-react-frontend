import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import jquery from "jquery";
import parsley from "parsleyjs";
import { useApi } from "../hooks/useApi";
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

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const { callApi, error, setError } = useApi();

  const [isLoading, setIsLoading] = useState(false);

  const registrationForm = useRef();

  useEffect(() => {
    jquery(registrationForm.current).parsley();
  }, []);

  const inputChangeHandler = (event, field) => {
    setData((prevData) => {
      return { ...prevData, [field]: event.target.value };
    });
  };

  const postData = async (data) => {
    setIsLoading(true);
    try {
      let respData = await callApi("/api/v1/auth/register", "POST", data);
      console.log(respData);
      toast.success("Registration Successful");
      resetHandler();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    try {
      postData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetHandler = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
    setError({});
  };

  return (
    <>
      <Container className="py-32">
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader className="text-black">
                Please Fill The Details
              </CardHeader>
              <CardBody>
                <form
                  ref={registrationForm}
                  onSubmit={submitHandler}
                  data-parsley-validate
                  data-parsley-focus="none"
                  noValidate
                >
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Name"
                      type="text"
                      onChange={(e) => inputChangeHandler(e, "name")}
                      value={data.name}
                      invalid={error?.name ? true : false}
                      data-parsley-trigger="focusout"
                      data-parsley-required-message="Name is required."
                      required
                      disabled={isLoading}
                      autoFocus
                    />
                    <FormFeedback>{error?.name}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="email"
                      type="email"
                      onChange={(e) => inputChangeHandler(e, "email")}
                      value={data.email}
                      invalid={error?.email ? true : false}
                      data-parsley-trigger="focusout"
                      data-parsley-required-message="Email is required."
                      required
                      disabled={isLoading}
                    />
                    <FormFeedback>{error?.email}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      placeholder="password"
                      type="password"
                      onChange={(e) => inputChangeHandler(e, "password")}
                      value={data.password}
                      invalid={error?.password ? true : false}
                      data-parsley-trigger="focusout"
                      data-parsley-required-message="Password is required."
                      required
                      disabled={isLoading}
                    />
                    <FormFeedback>{error?.password}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      id="about"
                      name="about"
                      placeholder="about"
                      type="textarea"
                      style={{ height: "10rem" }}
                      onChange={(e) => inputChangeHandler(e, "about")}
                      value={data.about}
                      invalid={error?.about ? true : false}
                      data-parsley-trigger="focusout"
                      data-parsley-required-message="About is required."
                      required
                      disabled={isLoading}
                    />
                    <FormFeedback>{error?.about}</FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button disabled={isLoading} color="success" type="submit">
                      {isLoading ? "Registering..." : "Register"}
                    </Button>
                    <Button
                      onClick={resetHandler}
                      className="ms-2"
                      color="warning"
                      type="reset"
                      disabled={isLoading}
                    >
                      Reset
                    </Button>
                  </Container>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
