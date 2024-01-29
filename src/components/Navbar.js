import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
function Navbar() {
    const history = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        history('/Login')
    }
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarButtonsExample">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : " "}`} to="/">NoteWise</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : " "}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : " "}`} to="/About">About</Link>

                        </li>
                    </ul>

                   {!localStorage.getItem('token')? "": <button onClick={handleLogout} className='btn btn-light'>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
