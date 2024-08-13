import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './Index';
//import Horaire from './Horaire';
// Importez ici d'autres composants nécessaires

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />  {/* Route d'accueil */}
                <Route path="/horaire/index" element={<Horaire />} />
                {/* Ajoutez ici d'autres routes */}
            </Routes>
        </Router>
    );
};

export default App;
