import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import ApprenantForm from './ApprenantForm';

const EditApprenant = ({ apprenant, disciplines }) => {
    return (
        <div className="container">
            <h1>Modification de l'apprenant : {apprenant.nom} {apprenant.prenom}</h1>
            <ApprenantForm apprenant={apprenant} disciplines={disciplines} />
        </div>
    );
};

export default EditApprenant;
