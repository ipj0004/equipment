import React from 'react'
import logo from './logo4.PNG'


function Header() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
            <img src={logo} class="d-inline-block align-text-top"/>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">SeeAll</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/addgvn7dqcu">NewRegistration</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/discardedgvn7dqcu">SeeDiscarded</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header