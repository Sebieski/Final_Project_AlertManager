import PropTypes from "prop-types";
import {parseJwt} from "../utils/commonFunctions.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

const Dashboard = ({token, userId}) => {
    const [clients, setClients] = useState([]);
    const decodedToken = parseJwt(token);
    const username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']

    useEffect(() =>{
        fetch("https://localhost:7249/api/Client", {
            headers: {
                Authorization: `Bearer ${token}`,
                'accept': '*!/!*'
            }
        })
            .then(res => res.json())
            .then(data => {
                const dataForUser = data.filter((item) => item.userId === userId)
                setClients(dataForUser);
            })
            .catch(err => console.error("Błąd pobierania danych:", err));
    }, []);

    return (
        <div className="container">
            <h2>Witaj w Alert Manager!</h2>
            <div className="d-flex flex-column align-items-start">
                <div className="username-box">
                    Jesteś zalogowany jako {username}.
                </div>
                <div className="username-box">
                    Masz przypisanych klientów: {clients.length}.
                    {" "}
                    <NavLink to="/portfolio">Idź do twoich klientów</NavLink>
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