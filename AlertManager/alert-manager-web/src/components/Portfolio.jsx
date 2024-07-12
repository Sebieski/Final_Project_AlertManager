import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getClients} from "../api/API.jsx";

const Portfolio = ({userId, token}) => {
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [capitalGroup, setCapitalGroup] = useState("");
    const [capitalGroups, setCapitalGroups] = useState([]);
    const [chosenExposure, setChosenExposure] = useState("");
    const [exposures, setExposures] = useState([]);


    useEffect(() =>{
        getClients(token, userId, setData, setCapitalGroups, setExposures, setFilteredData, null);
    }, [userId, token]);

    useEffect(() => {
        filterData();
    }, [capitalGroup, chosenExposure, data]);


    const filterData = () => {
        if (!data) return;

        let filtered = data;

        if (capitalGroup) {
            filtered = filtered.filter((item) => item.capitalGroup === capitalGroup);
        }

        if (chosenExposure) {
            filtered = filtered.filter((item) => item.exposure === chosenExposure);
        }

        setFilteredData(filtered);
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
                    onChange={(e) => setCapitalGroup(e.target.value)}
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
                    onChange={(e) => setChosenExposure(e.target.value)}
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