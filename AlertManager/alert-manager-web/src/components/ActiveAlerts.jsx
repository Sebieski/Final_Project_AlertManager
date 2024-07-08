import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {formatNumber} from "../utils/commonFunctions.jsx";
import {deleteAlert} from "../api/API.jsx";

const ActiveAlerts = ({userId, token}) => {
    const [alerts, setAlerts] = useState([])
    const [filteredAlerts, setFilteredAlerts] = useState([]);
    const [chosenClient, setChosenClient] = useState("");
    const [availableClients, setAvailableClients] = useState([]);
    const [chosenCurrencyPair, setChosenCurrencyPair] = useState("");
    const [availableCurrencyPairs, setAvailableCurrencyPairs] = useState([]);
    const [chosenDirection, setChosenDirection] = useState("");
    const [availableDirections, setAvailableDirections] = useState([]);
    const [currentEURPLN, setCurrentEURPLN] = useState("");
    const [currentUSDPLN, setCurrentUSDPLN] = useState("");

    const API = "http://api.nbp.pl/api/exchangerates/tables/A?format=json";

    useEffect(() =>{
        fetch(`https://localhost:7249/api/ClientsAlerts/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'accept': '*!/!*'
            }
        })
            .then(res => res.json())
            .then(data => {
                setAlerts(data);
                const clients = Array.from(new Set(data.map((item) => item.clientName)));
                setAvailableClients(clients);
                const currencyPairs = Array.from(new Set(data.map((item) => item.currencyPair)));
                setAvailableCurrencyPairs(currencyPairs);
                const directions = Array.from(new Set(data.map((item) => item.direction)));
                setAvailableDirections(directions);
                setFilteredAlerts(data);
            })
            .catch(err => console.error("Błąd pobierania danych:", err));
    }, [userId, token]);



    useEffect(() => {
        fetch(API)
            .then(response => response.json())
            .then(data => {
                const rates = data[0].rates;
                const eurRate = rates.find(rate => rate.code === 'EUR').mid.toFixed(4);
                const usdRate = rates.find(rate => rate.code === 'USD').mid.toFixed(4);

                setCurrentEURPLN(eurRate);
                setCurrentUSDPLN(usdRate);
            })
            .catch(err => {
                console.error("Błąd pobierania danych:", err);
            });
    }, []);


    const handleClientChange = (e) => {
        const client = e.target.value;
        setChosenClient(client);
        if (client === "") {
            setFilteredAlerts(alerts);
        } else {
            const filtered = alerts.filter((item) => item.clientName === client);
            setFilteredAlerts(filtered);
        }
    };

    const handleCurrencyPairChange = (e) => {
        const currencyPair = e.target.value;
        setChosenCurrencyPair(currencyPair);
        if (currencyPair === "") {
            setFilteredAlerts(alerts);
        } else {
            const filtered = alerts.filter((item) => item.currencyPair === currencyPair);
            setFilteredAlerts(filtered);
        }
    };

    const handleDirectionChange = (e) => {
        const direction = e.target.value;
        setChosenDirection(direction);
        if (direction === "") {
            setFilteredAlerts(alerts);
        } else {
            const filtered = alerts.filter((item) => item.direction === direction);
            setFilteredAlerts(filtered);
        }
    };

    const handleCallClient = (name) =>{
        console.log(`Dzwonię do klienta ${name}... `)
    }


    return (
        <div className="container mt-5">
            <h3 className="mb-4 text-center">Lista klientów z alertami</h3>
            <div className="mb-3">
                <label htmlFor="clientSelect" className="form-label">
                    Wybierz klienta:
                </label>
                <select
                    id="clientSelect"
                    className="form-select"
                    value={chosenClient}
                    onChange={handleClientChange}
                >
                    <option value="">Wszyscy klienci...</option>
                    {availableClients.map((client, index) => (
                        <option key={index} value={client}>
                            {client}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="currencyPairSelect" className="form-label">
                    Wybierz parę walutową:
                </label>
                <select
                    id="currencyPairSelect"
                    className="form-select"
                    value={chosenCurrencyPair}
                    onChange={handleCurrencyPairChange}
                >
                    <option value="">Wszystkie pary walutowe...</option>
                    {availableCurrencyPairs.map((pair, index) => (
                        <option key={index} value={pair}>
                            {pair}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="directionSelect" className="form-label">
                    Wybierz kierunek:
                </label>
                <select
                    id="directionSelect"
                    className="form-select"
                    value={chosenDirection}
                    onChange={handleDirectionChange}
                >
                    <option value="">Wszystkie kierunki...</option>
                    {availableDirections.map((direction, index) => (
                        <option key={index} value={direction}>
                            {direction}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">Numer klienta</th>
                    <th scope="col">Nazwa klienta</th>
                    <th scope="col">Para walutowa</th>
                    <th scope="col">Kierunek</th>
                    <th scope="col">Kwota (bazowa)</th>
                    <th scope="col">Kurs alertu</th>
                    <th scope="col">Bieżący kurs rynkowy</th>
                    <th scope="col">Akcje</th>
                </tr>
                </thead>
                <tbody>
                    {filteredAlerts.map((item, key) => {
                        const differenceEUR = Math.abs(item.rate - currentEURPLN);
                        const differenceUSD = Math.abs(item.rate - currentUSDPLN);
                        const highlightRow = differenceEUR <= 0.02 || differenceUSD <= 0.02;

                        return (
                            <tr key={key} className={highlightRow ? 'table-success' : ''}>
                                <td>{item.clientId}</td>
                                <td>{item.clientName}</td>
                                <td>{item.currencyPair}</td>
                                <td>{item.direction}</td>
                                <td style={{textAlign: 'right'}}>{formatNumber(item.amountBase)}</td>
                                <td><strong>{(item.rate).toFixed(4)}</strong></td>
                                <td>{item.currencyPair === "EUR/PLN" ? currentEURPLN :
                                    item.currencyPair === "USD/PLN" ? currentUSDPLN :
                                        "brak danych"}</td>
                                <td>
                                    <button
                                        style={{ height: 'auto', whiteSpace: 'nowrap' }}
                                        className="btn btn-danger"
                                        onClick={() => deleteAlert(item.alertId, token, alerts, setAlerts, setFilteredAlerts)}
                                    >
                                        Usuń alert
                                    </button>
                                    {highlightRow ? <button
                                        style={{ height: 'auto', whiteSpace: 'nowrap' }}
                                        className="btn btn-success"
                                        onClick={() => handleCallClient(item.clientName)}
                                    >
                                        Zadzwoń do klienta
                                    </button> : null}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ActiveAlerts;

ActiveAlerts.propTypes = {
    userId: PropTypes.number,
    token: PropTypes.string
}