import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const Portfolio = ({userId, token}) => {
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [capitalGroup, setCapitalGroup] = useState(null);
    const [capitalGroups, setCapitalGroups] = useState([]);
    const [chosenExposure, setChosenExposure] = useState(null);
    const [exposures, setExposures] = useState([]);


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
                setData(dataForUser);
                const groups = Array.from(new Set(dataForUser.map((item) => item.capitalGroup)));
                setCapitalGroups(groups);
                const exposures = Array.from(new Set(dataForUser.map((item) => item.exposure)));
                setExposures(exposures);
                setFilteredData(dataForUser);
            })
            .catch(err => console.error("Błąd pobierania danych:", err));
    }, [userId, token]);

    const handleGroupChange = (e) => {
        const group = e.target.value;
        setCapitalGroup(group);
        if (group === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) => item.capitalGroup === group);
            setFilteredData(filtered);
        }
    };

    const handleExposureChange = (e) => {
        const exposure = e.target.value;
        setChosenExposure(exposure);
        if (exposure === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) => item.exposure === exposure);
            setFilteredData(filtered);
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <h3 className="mb-4 text-center">Baza klientów:</h3>
            <div className="mb-3">
                <label htmlFor="capitalGroupSelect" className="form-label">
                    Filtrowanie po grupie kapitałowej:
                </label>
                <select
                    id="capitalGroupSelect"
                    className="form-select"
                    value={capitalGroup}
                    onChange={handleGroupChange}
                >
                    <option value="">Wybierz grupę kapitałową...</option>
                    {capitalGroups.map((group) => (
                        <option key={group} value={group}>
                            {group}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="exposureSelect" className="form-label">
                    Filtrowanie po ekspozycji klienta:
                </label>
                <select
                    id="exposureSelect"
                    className="form-select"
                    value={chosenExposure}
                    onChange={handleExposureChange}
                >
                    <option value="">Wybierz ekspozycję klienta...</option>
                    {exposures.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">Numer klienta</th>
                    <th scope="col">Nazwa</th>
                    <th scope="col">Grupa kapitałowa</th>
                    <th scope="col">Ekspozycja walutowa</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {filteredData && filteredData.map((c) => (
                    <tr key={c.clientId}>
                        <td>{c.clientId}</td>
                        <td>{c.clientName}</td>
                        <td>{c.capitalGroup}</td>
                        <td>{c.exposure}</td>
                        <td>
                            <button style={{
                                backgroundColor: '#ffd966',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}>Dodaj alert
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )

}
export default Portfolio;

Portfolio.propTypes = {
    userId: PropTypes.number,
    token: PropTypes.string,
    setClients: PropTypes.func
}