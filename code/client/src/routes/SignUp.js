import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function SignUp() {
  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    address: "",
    birthday: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.verifyPassword) {
      setPasswordMatch(false);
      setFormSubmitted(true);
      return;
    }
    console.log(formValues); // Do whatever you want with the form values
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormSubmitted(false); // Reset form submission flag when a field is changed
    setFormValues({ ...formValues, [name]: value });
  };

  const handleVerifyPasswordChange = (e) => {
    const { value } = e.target;
    setPasswordMatch(value === formValues.password);
    handleChange(e);
  };

  return (
    <Container className="my-5">
      <header className="text-center mb-5">
        <h1 className="display-4">Sign Up</h1>
        <p className="lead">Create an account and start using Nomad</p>
      </header>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            name="birthday"
            value={formValues.birthday}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </Form.Group>

        <Form.Group controlId="formVerifyPassword">
          <Form.Label>Verify Password</Form.Label>
          <Form.Control
            type="password"
            name="verifyPassword"
            value={formValues.verifyPassword}
            onChange={handleVerifyPasswordChange}
            placeholder="Re-enter your password"
            required
          />
          {!passwordMatch && formSubmitted && (
            <Form.Text className="text-danger">
              Passwords do not match!
            </Form.Text>
          )}
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}
export default SignUp;
