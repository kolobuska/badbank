import * as React from "react";
import UserContext from "./context";
import Card from "./card";

function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  const handleLogin = () => {
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) return;
    var loggedUser = ctx.users.find(
      (user) => user.email === email && user.password === password
    );
    if (loggedUser == null) {
      setStatus("Error: wrong email or password");
      setTimeout(() => setStatus(""), 3000);
      return;
    }
    setShow(false);
    var currentUser = ctx.users.find((user) => user.email === email);
    ctx.currentUser = currentUser;
  };

  const handleLogout = () => {
    setEmail("");
    setPassword("");
    ctx.currentUser = "";
    setShow(true);
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
    if (!value) {
      setStatus("Error: Password can't be empty");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  return (
    <Card
      bgcolor="warning"
      txtcolor="dark"
      header="Login"
      status={status}
      body={
        show && !ctx.currentUser ? (
          <>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
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
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <div>You are now logged in</div>
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )
      }
    />
  );
}

export default Login;
