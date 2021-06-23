import * as React from 'react';
import UserContext from "./context";
import Card from './card';

function AllData() {
    const ctx = React.useContext(UserContext);
    return (
        <>
            <Card
            bgcolor="success"
            txtcolor="dark"
            header="All Data"
            body={<Table users={ctx.users} />}
        />
        </>
    );
}

function Table({ users }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Password</th>
                    <th scope="col">Balance</th>
                </tr>
            </thead>
            <tbody>

                {users.map((user, i) => (
                    <TableRow user={user} index={i} key={i}/>
                ))
                }

            </tbody>
        </table>
    );
}

function TableRow(props) {
    console.log(props);
    return (
        <tr>
            <th scope="row">{props.index + 1}</th>
            <td>{props.user.name}</td>
            <td>{props.user.email}</td>
            <td>{props.user.password}</td>
            <td>{props.user.balance}</td>
        </tr>
    );
}

export default AllData;