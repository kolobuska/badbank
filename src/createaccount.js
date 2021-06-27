import * as React from "react";
import BankForm from "./bankForm";
import UserContext from "./context";

function CreateAccount() {
  const ctx = React.useContext(UserContext);

  function handle(data) {
    ctx.users.push({
      name: data.name,
      email: data.email,
      password: data.password,
      balance: 100,
    });
    return true;
  }

  return (
    <BankForm
      bgcolor="success"
      label="Create Account"
      handle={handle}
      hideAmount={true}
      successButton="Add another account"
    />
  );
}

export default CreateAccount;
