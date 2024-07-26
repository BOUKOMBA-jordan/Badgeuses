import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index1 from './Index1';
// Importez les autres composants nécessaires

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Autres routes */}
                <Route path="/horaire/index1" element={<Index1 />} />
                {/* Ajoutez ici d'autres routes */}
            </Routes>
        </Router>
    );
};

export default App;
