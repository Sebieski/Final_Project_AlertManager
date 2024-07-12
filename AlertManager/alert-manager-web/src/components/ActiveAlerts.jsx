import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {formatNumber} from "../utils/commonFunctions.jsx";
import {deleteAlert, getAlertsForUser, getRates} from "../api/API.jsx";

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



    useEffect(() =>{
        getAlertsForUser(token, userId, setAlerts, setAvailableClients, setAvailableCurrencyPairs, setAvailableDirections, setFilteredAlerts)
    }, [userId, token]);


    useEffect(() => {
        getRates(null, setCurrentEURPLN, setCurrentUSDPLN);
        }, []);

    useEffect(() => {
        filterAlerts();
    }, [chosenClient, chosenCurrencyPair, chosenDirection, alerts]);

    const filterAlerts = () => {
        let filtered = alerts;

        if (chosenClient) {
            filtered = filtered.filter((item) => item.clientName === chosenClient);
        }

        if (chosenCurrencyPair) {
            filtered = filtered.filter((item) => item.currencyPair === chosenCurrencyPair);
        }

        if (chosenDirection) {
            filtered = filtered.filter((item) => item.direction === chosenDirection);
        }

        setFilteredAlerts(filtered);
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
                    onChange={(e) => setChosenClient(e.target.value)}
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
                    onChange={(e) => setChosenCurrencyPair(e.target.value)}
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
                    onChange={(e) => setChosenDirection(e.target.value)}
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