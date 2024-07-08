import {NavLink} from "react-router-dom";
import '../../styles/Header.css';
import PropTypes from "prop-types";

const Header = ({setToken}) => {
    const activeStyle = {
        backgroundColor: 'limegreen',
        border: '2px solid #0d4024',
        borderRadius: '8px',
        color: '#0d4024',
        fontWeight: 'bold',
        padding: '10px 20px',
        transition: 'background-color 0.3s ease, color 0.3s ease'
    };

    const handleLogout = () => {
        setToken(null);
    }

    return (
        <nav>
            <h1>Alert Manager v. 1.0!</h1>
            <ul>
                <li><NavLink to="/" style={({ isActive }) => isActive ? activeStyle : undefined}>Strona główna</NavLink></li>
                <li><NavLink to="/portfolio" style={({ isActive }) => isActive ? activeStyle : undefined}>Twoi klienci</NavLink></li>
                <li><NavLink to="/fxrates" style={({ isActive }) => isActive ? activeStyle : undefined}>Aktualne kursy</NavLink></li>
                <li><NavLink to="/alerts" style={({ isActive }) => isActive ? activeStyle : undefined}>Aktywne alerty</NavLink></li>
                <li><NavLink to="/addalert" style={({ isActive }) => isActive ? activeStyle : undefined}>Dodaj alert</NavLink></li>
                <li><button onClick={handleLogout}>Wyloguj</button></li>
            </ul>
        </nav>
    )
}

export default Header;

Header.propTypes = {
    setToken: PropTypes.func,
}