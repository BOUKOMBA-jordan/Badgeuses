// resources/js/Pages/Admin/Discipline/Create.jsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Create = () => {
    const [nom, setNom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('admin.discipline.store'), { nom }).then(() => {
            // Redirection ou autre action après la création réussie
        }).catch((error) => {
            // Gestion des erreurs, si nécessaire
            console.log(error);
        });
    };

    return (
        <div className="container mt-5">
            <h1>Créer une nouvelle discipline</h1>
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
                <button type="submit" className="btn btn-primary">Créer</button>
            </form>
        </div>
    );
}

export default Create;
