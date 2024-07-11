import PropTypes from "prop-types";
import { parseJwt } from "../utils/commonFunctions.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAlertsForUser, getClients } from "../api/API.jsx";

const Dashboard = ({token, userId}) => {
    const [data, setData] = useState([]);
    const [alerts, setAlerts] = useState([]);

    const decodedToken = parseJwt(token);
    const username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']

    useEffect(() =>{
        getClients(token, userId, setData, null, null, null, null);
    }, []);

    useEffect(() =>{
        getAlertsForUser(token, userId, setAlerts, null, null, null, null);
    }, []);

    return (
        <div className="container">
            <h2>Witaj w Alert Manager!</h2>
            <div className="d-flex flex-column align-items-start">
                <div className="username-box">
                    Jesteś zalogowany jako <strong>{username}</strong>.
                </div>
                <div className="username-box">
                    Masz przypisanych klientów: {data.length}.
                    {"   "}
                    <NavLink to="/portfolio">Idź do twoich klientów</NavLink>
                </div>
                <div className="username-box">
                    Masz aktywnych alertów: {alerts.length}.
                    {"   "}
                    <NavLink to="/alerts">Idź aktywnych alertów twoich klientów</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

Dashboard.propTypes = {
    token: PropTypes.string,
    userId: PropTypes.number
}