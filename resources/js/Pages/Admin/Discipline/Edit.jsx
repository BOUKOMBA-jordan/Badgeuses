// resources/js/Pages/Admin/Discipline/Edit.jsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Edit = ({ discipline }) => {
    const [nom, setNom] = useState(discipline.nom);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route('admin.discipline.update', { id: discipline.id }), { nom }).then(() => {
            // Redirection ou autre action après la mise à jour réussie
        }).catch((error) => {
            // Gestion des erreurs, si nécessaire
            console.log(error);
        });
    };

    return (
        <div className="container mt-5">
            <h1>Modifier la discipline</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
            </form>
        </div>
    );
}

export default Edit;
