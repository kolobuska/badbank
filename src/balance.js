import * as React from 'react';
import UserContext from "./context";

function Balance() {
    const ctx = React.useContext(UserContext);
    const balance = ctx.currentUser.balance;
    return (
        <>
        Balance ${balance}
        </>
    );
}
export default Balance;