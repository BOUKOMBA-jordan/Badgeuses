import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import ApprenantForm from "./ApprenantFormulaire";

const EditApprenant = ({ apprenant, disciplines, cartes }) => {
    const [successMessage, setSuccessMessage] = useState('');

    return (
        <div className="container mt-5">
            
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <ApprenantForm
                apprenant={apprenant}
                disciplines={disciplines}
                cartes={cartes}
                onSuccess={() => setSuccessMessage('Apprenant mis à jour avec succès.')}
            />
        </div>
    );
};

export default EditApprenant;
