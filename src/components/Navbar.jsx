import React from 'react'
import "./Navbar.css"
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    let token = sessionStorage.getItem("token")
    let user = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
      };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
            <div className="container">
                <Link to={'/'} className="navbar-brand"><i class="fa-solid fa-hotel"></i> Silver Star</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={'/'}><i class="fa-solid fa-house"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/menu'}><i class="fa-solid fa-bars"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={'/cart'}><i class="fa-solid fa-cart-shopping"></i></Link>
                        </li>
                        
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle className='rounded-5 ms-5' id="dropdown-basic">
                                <i className="fa-solid fa-user"></i>

                                </Dropdown.Toggle>
                               <span className='fw-bold ms-2'> {token ? `Hi, ${user?.username}` : ""}</span>
                                <Dropdown.Menu>
                                    {token ? (
                                        <>
                                            <Dropdown.Item href="/myorders">My Orders</Dropdown.Item>
                                            {/* <Dropdown.Item href="/profile">Profile</Dropdown.Item> */}
                                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                        </>
                                    ) : (
                                        <Dropdown.Item href="/login">Login</Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar