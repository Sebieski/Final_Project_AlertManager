const API = "http://api.nbp.pl/api/exchangerates/tables/A?format=json";

export const login = async (username, password) => {
    const response = await fetch('https://localhost:7249/api/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return response.text();
};

export const getAlertsForUser = (token, userId, setAlerts, setAvailableClients, setAvailableCurrencyPairs, setAvailableDirections, setFilteredAlerts) => {
    fetch(`https://localhost:7249/api/ClientsAlerts/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'accept': '*!/!*'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (setAvailableClients && setAvailableCurrencyPairs && setAvailableDirections && setFilteredAlerts) {
                const clients = Array.from(new Set(data.map((item) => item.clientName)));
                setAvailableClients(clients);
                const currencyPairs = Array.from(new Set(data.map((item) => item.currencyPair)));
                setAvailableCurrencyPairs(currencyPairs);
                const directions = Array.from(new Set(data.map((item) => item.direction)));
                setAvailableDirections(directions);
                setFilteredAlerts(data);
            }
            setAlerts(data);
        })
        .catch(err => console.error("Błąd pobierania danych:", err));
}

export const addAlert = (token, newAlert, clearFields, setAlertAdded) => {
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
            setAlertAdded("success");
            console.log("Dodano alert!");
        })
        .catch(err => console.error("Błąd dodania alertu!", err));
}

export const deleteAlert = (id, token, alerts, setAlerts, setFilteredAlerts) => {
    fetch(`https://localhost:7249/api/Alert/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'accept': '*!/!*'
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Usunięcie alertu nie powiodło się: ${res.statusText}`);
            }
            const updatedAlerts = alerts.filter(alert => alert.alertId !== id);
            setAlerts(updatedAlerts);
            setFilteredAlerts(updatedAlerts);
        })
        .then(data => console.log("Alert został usunięty:", data))
        .catch(err => console.error("Błąd: ", err));
};

export const getClients = (token, userId, setData, setCapitalGroups, setExposures, setFilteredData, setClients) => {
    fetch("https://localhost:7249/api/Client", {
        headers: {
            Authorization: `Bearer ${token}`,
            'accept': '*!/!*'
        }
    })
        .then(res => res.json())
        .then(data => {
            const dataForUser = data.filter((item) => item.userId === userId)
            if (setClients){
                const clientsData = dataForUser.map((item) => ({
                    clientId: item.clientId,
                    clientName: item.clientName
                }));
                setClients(clientsData);
            } else {
                setData(dataForUser);
                if (setCapitalGroups && setExposures && setFilteredData) {
                    const groups = Array.from(new Set(dataForUser.map((item) => item.capitalGroup)));
                    setCapitalGroups(groups);
                    const exposures = Array.from(new Set(dataForUser.map((item) => item.exposure)));
                    setExposures(exposures);
                    setFilteredData(dataForUser);
                }
            }
        })
        .catch(err => console.error("Błąd pobierania danych:", err));
}


export const getRates = (setCurrentRates, setCurrentEURPLN, setCurrentUSDPLN) => {
    fetch(API)
        .then(response => response.json())
        .then(data => {
            const rates = data[0].rates;
            const eurRate = rates.find(rate => rate.code === 'EUR').mid.toFixed(4);
            const usdRate = rates.find(rate => rate.code === 'USD').mid.toFixed(4);

            if (setCurrentRates === null){
                setCurrentEURPLN(eurRate);
                setCurrentUSDPLN(usdRate);
            } else {
                setCurrentRates(data[0]);
            }

        })
        .catch(err => {
            console.error("Błąd pobierania danych:", err);
        });
}
