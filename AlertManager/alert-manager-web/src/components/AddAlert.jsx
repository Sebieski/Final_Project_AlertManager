import PropTypes from "prop-types";
import {useEffect, useState} from 'react';
import {addAlert, getClients, getRates} from "../api/API.jsx";

const AddAlert = ({userId, token}) => {
    const [clients, setClients] = useState([]);
    const [chosenClient, setChosenClient] = useState("");
    const [chosenCurrencyPair, setChosenCurrencyPair] = useState("");
    const [chosenDirection, setChosenDirection] = useState("");
    const [chosenAmountBase, setChosenAmountBase] = useState("");
    const [chosenRate, setChosenRate] = useState("");
    const [alertAdded, setAlertAdded] = useState(null);

    const [currentEURPLN, setCurrentEURPLN] = useState("");
    const [currentUSDPLN, setCurrentUSDPLN] = useState("");

    const clearFields = () => {
        setChosenClient("");
        setChosenCurrencyPair("");
        setChosenDirection("");
        setChosenAmountBase("");
        setChosenRate("");
    }

    useEffect(() =>{
        getClients(token, userId, null, null, null, null, setClients)
    }, [userId, token]);

    useEffect(() => {
        getRates(null, setCurrentEURPLN, setCurrentUSDPLN);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlertAdded(null);
        }, 3000); // Ukryj komunikat po 3 sekundach

        return () => clearTimeout(timer);
    }, [alertAdded]);

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && Number(value) > 0) {
            setChosenAmountBase(value);
        }
    };

    const handleRateChange = (e) => {
        const value = e.target.value;
        const validValue = value.replace(/[^0-9.]/g, '');
        const dotCount = (validValue.match(/\./g) || []).length;
        if (dotCount > 1) {
            return;
        }
        const numValue = parseFloat(validValue);
        if (validValue === "" || isNaN(numValue)) {
            return;
        } else if (numValue < 3.0000 || numValue > 5.9999) {
            console.error("Wartość musi być z przedziału od 3.0000 do 5.9999");
            return;
        }
        setChosenRate(validValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!chosenClient || !chosenCurrencyPair || !chosenDirection || !chosenAmountBase || !chosenRate) {
            console.error("Proszę wypełnić wszystkie wymagane pola!");
            setAlertAdded("error")
            clearFields();
            return;
        }

        const newAlert = {
            clientId: chosenClient,
            currencyPair: chosenCurrencyPair,
            direction: chosenDirection,
            amountBase: chosenAmountBase,
            rate: chosenRate
        }

        addAlert(token, newAlert, clearFields, setAlertAdded);
    }


    return(
        <div className="container mt-5">
            <h3 className="mb-4 text-center">Dodaj nowy alert:</h3>
            {alertAdded === "success" && (
                <div className="alert alert-success" role="alert">
                    Dodano alert! <span role="img" aria-label="checked-tick">✅</span>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nazwa klienta:</label>
                    <select className="form-select" value={chosenClient}
                            onChange={(e) => setChosenClient(e.target.value)}>
                        <option value="">Wybierz klienta...</option>
                        {clients.map((client) => (
                            <option key={client.clientId} value={client.clientId}>
                                {client.clientName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Para walutowa:</label>
                    <select className="form-select" value={chosenCurrencyPair}
                            onChange={(e) => setChosenCurrencyPair(e.target.value)}>
                        <option value="">Wybierz parę walutową...</option>
                        <option value="EUR/PLN">EUR/PLN</option>
                        <option value="USD/PLN">USD/PLN</option>
                    </select>
                    <br/>
                    {chosenCurrencyPair === "EUR/PLN" && <p><strong>Aktualny EUR/PLN: {currentEURPLN}</strong></p>}
                    {chosenCurrencyPair === "USD/PLN" && <p><strong>Aktualny USD/PLN: {currentUSDPLN}</strong></p>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Kierunek (od strony Banku):</label>
                    <select className="form-select" value={chosenDirection}
                            onChange={(e) => setChosenDirection(e.target.value)}>
                        <option value="">Wybierz kierunek transakcji...</option>
                        <option value="Buy">Buy</option>
                        <option value="Sell">Sell</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Kwota w walucie bazowej:</label>
                    <input type="number" className="form-control" value={chosenAmountBase}
                           onChange={handleAmountChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Kurs alertu:</label>
                    <input type="text" className="form-control" value={chosenRate}
                           onChange={handleRateChange}/>
                </div>
                <button type="submit" className="btn btn-success">Dodaj alert</button>
                <button type="button" className="btn btn-danger" onClick={() => clearFields()}>Wyczyść pola</button>
            </form>
            {alertAdded === "error" && (
                <div className="alert alert-danger mt-3">
                    <strong>Proszę wypełnić wszystkie wymagane pola!</strong>
                </div>
            )}
        </div>
    )
}

export default AddAlert;

AddAlert.propTypes = {
    userId: PropTypes.number,
    token: PropTypes.string
}