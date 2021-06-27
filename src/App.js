import "./App.css";
import NavBar from "./navbar";
import Home from "./home";
import CreateAccount from "./createaccount";
import Login from "./login";
import Deposit from "./deposit.js";
import AllData from "./alldata";
import WithDraw from "./withdraw";
import { HashRouter, Route } from "react-router-dom";
import UserContext from "./context";

function App() {
  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider
        value={{
          users: [
            {
              name: "abel",
              email: "abel@mit.edu",
              password: "secret",
              balance: 100,
            },
          ],
          currentUser: "",
        }}
      >
        <Route path="/" exact component={Home} />
        <Route path="/createaccount/" component={CreateAccount} />
        <Route path="/login/" component={Login} />
        <Route path="/deposit/" component={Deposit} />
        <Route path="/withdraw/" component={WithDraw} />
        <Route path="/alldata/" component={AllData} />
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
