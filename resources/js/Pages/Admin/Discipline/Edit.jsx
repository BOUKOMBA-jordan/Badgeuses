// resources/js/Pages/Admin/Discipline/Edit.jsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Edit = ({ discipline }) => {
    const [nom, setNom] = useState(discipline.nom);
    const [description, setDescription] = useState(discipline.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route('admin.discipline.update', { id: discipline.id }), { nom, description });
    };

    return (
        <div>
            <h1>Modifier la discipline</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom</label>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );
}

export default Edit;
