// resources/js/Pages/Admin/Discipline/Create.jsx

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Create = () => {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route('admin.discipline.store'), { nom, description });
    };

    return (
        <div>
            <h1>Créer une nouvelle discipline</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom</label>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit">Créer</button>
            </form>
        </div>
    );
}

export default Create;
