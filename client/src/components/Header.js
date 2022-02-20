import React from 'react'
import logo from './logoTemp.PNG'


function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img src={logo} className="d-inline-block align-text-top" alt="logo"/>&nbsp;
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="btn btn-outline-primary" href="/" role="button">SeeAll</a>&nbsp;
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-success" href="/addgvn7dqcu">NewRegistration</a>&nbsp;
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-secondary" href="/discardedgvn7dqcu">SeeDiscarded</a>&nbsp;
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header