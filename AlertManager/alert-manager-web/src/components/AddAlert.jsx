import PropTypes from "prop-types";
import {useEffect, useState} from 'react';
import {isValidRate} from "../utils/commonFunctions.jsx";

const AddAlert = ({userId, token}) => {
    const [clients, setClients] = useState([]);
    const [chosenClient, setChosenClient] = useState(null);
    const [chosenCurrencyPair, setChosenCurrencyPair] = useState(null);
    const [chosenDirection, setChosenDirection] = useState(null);
    const [chosenAmountBase, setChosenAmountBase] = useState(null);
    const [chosenRate, setChosenRate] = useState(null);
    const [alertAdded, setAlertAdded] = useState("");

    const [currentEURPLN, setCurrentEURPLN] = useState("");
    const [currentUSDPLN, setCurrentUSDPLN] = useState("");

    const API = "http://api.nbp.pl/api/exchangerates/tables/A?format=json";

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
                const clientsData = dataForUser.map((item) => ({
                    clientId: item.clientId,
                    clientName: item.clientName
                }));
                setClients(clientsData);
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlertAdded(false);
        }, 3000); // Ukryj komunikat po 3 sekundach

        return () => clearTimeout(timer);
    }, [alertAdded]);

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && Number(value) > 0) {
            setChosenAmountBase(value);
        }
    };

    //walidacja blokuje możliwość wpisywania w polu Rate
    /*const handleRateChange = (e) => {
        setChosenRate(e.target.value)
        /!*let value = e.target.value;
        if (isValidRate(value)){
            setChosenRate(value);
        }  else {
        console.error("Nieprawidłowy format kursu alertu!");*!/
    }};*/

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!chosenClient || !chosenCurrencyPair || !chosenDirection || !chosenAmountBase || !chosenRate) {
            console.error("Proszę wypełnić wszystkie wymagane pola!");
            setAlertAdded("error")
            return;
        }

        const newAlert = {
            clientId: chosenClient,
            currencyPair: chosenCurrencyPair,
            direction: chosenDirection,
            amountBase: chosenAmountBase,
            rate: chosenRate
        }
        console.log(newAlert);
        fetch("https://localhost:7249/api/Alert", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'accept': '*!/!*',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAlert)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Błąd dodawania alertu!");
                }
                clearFields();
                setAlertAdded(true);
                console.log("Dodano alert!");
            })
            .catch(err => console.error("Błąd dodania alertu!", err));
    }

    const clearFields = () => {
        setChosenClient("");
        setChosenCurrencyPair("");
        setChosenDirection("");
        setChosenAmountBase("");
        setChosenRate("");
    }

    return(
        <>
            <h3 className="mb-4">Dodaj nowy alert:</h3>
            {alertAdded && (
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
                           onChange={(e) => (setChosenRate(e.target.value))}/>
                </div>
                <button type="submit" className="btn btn-success">Dodaj alert</button>
                <button type="button" className="btn btn-danger" onClick={() => clearFields()}>Wyczyść pola</button>
            </form>
            {alertAdded === "error" && (
                <div className="alert alert-danger mt-3">
                    <strong>Proszę wypełnić wszystkie wymagane pola!</strong>
                </div>
            )}
        </>
    )
}

export default AddAlert;

AddAlert.propTypes = {
    userId: PropTypes.number,
    token: PropTypes.string
}