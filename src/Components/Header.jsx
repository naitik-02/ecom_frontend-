import React from 'react';
import { Nav, Container, Button, Navbar } from 'react-bootstrap';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../Context/UserContext';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const Header = ({ isAuth }) => {
    const navigate = useNavigate();
    const { setUser, setIsAuth } = UserData();

    const logoutHandler = () => {
        localStorage.clear();
        setUser([]);
        setIsAuth(false);
        toast.success('Logged Out');
        navigate('/login');
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
                <Container>
                    <Navbar.Brand>Trend's House</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/products">Products</Nav.Link>
                            <Nav.Link as={Link} to="/account">Account</Nav.Link>
                        </Nav>
                        {isAuth ? (
                            <>
                                <Button onClick={() => navigate('/cart')} variant="success" className="mx-2 cart-button">
                                    <MdOutlineShoppingCart />
                                </Button>
                                <Button onClick={logoutHandler} variant="danger">Logout</Button>
                            </>
                        ) : (
                            <Button onClick={() => navigate('/login')} variant="success">Login</Button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Toaster position="bottom-right" />
        </>
    );
}

export default Header;
