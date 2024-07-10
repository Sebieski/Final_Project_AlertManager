import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Header from "./components/common/Header.jsx";
import FXRates from "./components/FXRates.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/common/Footer.jsx";
import Portfolio from "./components/Portfolio.jsx";
import {useState} from "react";
import LoginComponent from "./components/LoginComponent.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ActiveAlerts from "./components/ActiveAlerts.jsx";
import AddAlert from "./components/AddAlert.jsx";

function App() {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    console.log(token);

  return (
    <>
        <BrowserRouter>
            {token && <Header setToken={setToken}/>}
            <Routes>
                <Route exact path="/" element={token? <Dashboard token={token} userId={userId} /> : <LoginComponent setUserId={setUserId} setToken={setToken} />} />
                <Route path="/portfolio" element={token? <Portfolio token = {token} userId = {userId} /> : <Navigate to="/" />} />
                <Route path="/fxrates" element={token ? <FXRates /> : <Navigate to="/" />} />
                <Route path="/alerts" element={token ? <ActiveAlerts token={token} userId={userId}/> : <Navigate to="/" />} />
                <Route path="/addalert" element={token ? <AddAlert token={token} userId={userId}/> : <Navigate to="/" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </>
  )
}

export default App
