function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">BadBank <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/createaccount/">Create Account</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/login/">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/deposit/">Deposit</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/withdraw/">Withdraw</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/balance/">Balance</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/alldata/">AllData</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;