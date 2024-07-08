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