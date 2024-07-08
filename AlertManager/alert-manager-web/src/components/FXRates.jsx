import {useEffect, useState} from "react";

const FXRates = () => {
    const [currentRates, setCurrentRates] = useState(null);
    const API = "http://api.nbp.pl/api/exchangerates/tables/A?format=json";

    useEffect(() => {
        fetch(API)
            .then(response => response.json())
            .then(data => {
                setCurrentRates(data[0]);
            })
            .catch(err => {
            console.error("Błąd pobierania danych:", err);
        });
    }, []);

    if (currentRates === null) {
        return <h3>Pobieram aktualne kursy...</h3>
    } else {
        return (
            <div>
                <div className="container mt-5 pt-5">
                    <h3 className="mb-4 text-center">Kursy aktualne na {currentRates.effectiveDate}:</h3>
                    <table className="table table-striped table-dark table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Waluta</th>
                            <th scope="col">Kod</th>
                            <th scope="col">Aktualny kurs</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentRates.rates.map((rate) => (
                            <tr key={rate.code}>
                                <td>{rate.currency}</td>
                                <td>{rate.code}/PLN</td>
                                <td>{rate.mid}</td>
                                <td>
                                    <button style={{
                                        backgroundColor: '#ffd966',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}>Idź do alertów
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default FXRates;