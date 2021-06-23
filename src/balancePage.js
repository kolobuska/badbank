import * as React from 'react';
import UserContext from "./context";
import Card from './card';
import Balance from './balance';

function BalancePage() {
    const ctx = React.useContext(UserContext);
    return (
        <Card
            bgcolor="success"
            txtcolor="dark"
            header="Balance"
            body={ctx.currentUser ? (
                <>
                    <Balance />
                </>
            ) : (
                <>
                    <h5>Error</h5>
                    <div>You are not logged in</div>
                </>
            )}
        />

    );
}

export default BalancePage;