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

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    error: {},
  });

  const inputChangeHandler = (event, field) => {
    setData((prevData) => {
      return { ...prevData, [field]: event.target.value };
    });
  };

  const postData = async (data) => {
    try {
      const response = await fetch("http://localhost:9090/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
      });

      const respData = await response.json();

      if (!response.ok) {
        console.dir(response);
        if (response.status === 404) {
          setError({
            message: "404 ERROR !! Bad Request",
          });
        } else {
          setError({
            ...respData,
          });
        }

        for (let field in respData) {
          toast.error(respData[field]);
        }
        throw new Error(response.status);
      }
      console.log(respData);
      toast.success("Registration Successful");
      resetHandler();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    try {
      postData(data);
    } catch (error) {
      // toast.error(error.message);
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
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>Please Fill The Details</CardHeader>
              <CardBody>
                <Form onSubmit={submitHandler}>
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
                    />
                    <FormFeedback>{error?.about}</FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="success" type="submit">
                      Register
                    </Button>
                    <Button
                      onClick={resetHandler}
                      className="ms-2"
                      color="warning"
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

export default Signup;
