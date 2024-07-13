import * as Ziggy from '/node_modules/.vite/deps/ziggy-js.js?v=adc54080'; // Importer toutes les fonctions de Ziggy

import React from 'react';
import ApprenantForm from './ApprenantFormulaire.jsx';

const Create = () => {
    const apprenant = null; // Assurez-vous de récupérer les détails de l'apprenant correctement ici

    return (
        <div>
            <ApprenantForm apprenant={apprenant} route={Ziggy.route} /> {/* Passer la fonction route de Ziggy en tant que prop */}
        </div>
    );
};

export default Create;
