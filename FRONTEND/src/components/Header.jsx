// components/Header.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

function Header() {

    const { user, isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    function go_home() {
        navigate("/");
    }

    return (
        <header className='header'>
            <div className='float_left header_top'>
                <div className='header_logo'></div>
                <div className='header_title' onClick={go_home}>Réservation de Salle</div>
            </div>

            <nav className='nav float_clear'>
                <Link to="/" className="link nav_link">Accueil</Link>
                {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}

                {isAuthenticated ? (
                    <>
                        <span>{user?.firstname}</span>
                        <button className='btn_regular color_light' onClick={handleLogout}>Déconnexion</button>
                    </>
                ) : (
                    <>
                        <Link className='link nav_link' to="/login">Connexion</Link>
                        <Link className='link nav_link' to="/register">S'inscrire</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
export default Header;