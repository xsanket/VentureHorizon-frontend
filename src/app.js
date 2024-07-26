import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedPage from './components/ProtectedPage';
import Register from './pages/Register';


const App = () => {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<ProtectedPage><Home /></ProtectedPage>} />
                </Routes>
            </Router>
        </div>

    );
};

export default App;