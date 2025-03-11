import React from 'react';
import "./Navbar.css";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    let token = sessionStorage.getItem("token");
    let user = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <Link to={'/'} className="navbar-brand d-flex align-items-center">
                    <i className="fa-solid fa-hotel me-2"></i> Silver Star
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link" to={'/'}><i className="fa-solid fa-house"></i> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/menu'}><i className="fa-solid fa-bars"></i> Menu</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link position-relative' to={'/cart'}>
                                <i className="fa-solid fa-cart-shopping"></i> Cart
                            </Link>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <Dropdown>
                                <Dropdown.Toggle className='btn btn-light rounded-circle border' id="dropdown-basic">
                                    <i className="fa-solid fa-user"></i>
                                </Dropdown.Toggle>
                                <span className='fw-bold ms-2 d-lg-inline d-none'> {token ? `Hi, ${user?.username}` : ""}</span>
                                <Dropdown.Menu className="text-center">
                                    {token ? (
                                        <>
                                            <Dropdown.Item as={Link} to="/myorders">My Orders</Dropdown.Item>
                                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                        </>
                                    ) : (
                                        <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
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

export default Navbar;
