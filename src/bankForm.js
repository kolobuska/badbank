import * as React from "react";
import Card from "./card";

function BankForm(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [buttonEnabled, setButtonEnabled] = React.useState(false);

  const handleCreate = () => {
    setStatus("");
    if (!validateName(name)) return;
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) return;
    const data = {
      name: name,
      email: email,
      password: password,
    };
    props.handle(data);
    setShow(false);
  };

  const validateName = (value) => {
    if (!value) {
      setStatus("Error: Name can't be empty");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const validateEmail = (value) => {
    if (!value) {
      setStatus("Error: Email can't be empty");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const validatePassword = (value) => {
    if (!value || value.length < 8) {
      setStatus("Error: Password should be 8 characters or more");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  };

  const handleNameChange = (value) => {
    setName(value);
    if (!value && !email && !password) {
      setButtonEnabled(false);
      return;
    }
    setButtonEnabled(true);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (!value && !name && !password) {
      setButtonEnabled(false);
      return;
    }
    setButtonEnabled(true);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (!value && !email && !name) {
      setButtonEnabled(false);
      return;
    }
    setButtonEnabled(true);
  };

  return (
    <Card
      bgcolor={props.bgcolor}
      header={props.label}
      status={status}
      body={
        show ? (
          <>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => handleNameChange(e.currentTarget.value)}
            />
            <br />
            <label htmlFor="email">Email address</label>
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => handleEmailChange(e.currentTarget.value)}
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => handlePasswordChange(e.currentTarget.value)}
            />
            <br />
            <button
              disabled={!buttonEnabled}
              type="submit"
              className="btn btn-light"
              onClick={(e) => handleCreate()}
            >
              {props.label}
            </button>
          </>
        ) : (
          <>
            <h5>New Account created</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              {props.successButton}
            </button>
          </>
        )
      }
    />
  );
}

export default BankForm;
