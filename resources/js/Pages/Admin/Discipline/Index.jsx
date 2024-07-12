// resources/js/Pages/Admin/Discipline/Index.jsx

import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const Index = ({ disciplines }) => {
    return (
        <div>
            <h1>Liste des disciplines</h1>
            <ul>
                {disciplines.map((discipline) => (
                    <li key={discipline.id}>
                        <Link href={route('admin.discipline.edit', { id: discipline.id })}>
                            {discipline.nom}
                        </Link>
                        <button onClick={() => handleDelete(discipline.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            <Link href={route('admin.discipline.create')}>Créer une nouvelle discipline</Link>
        </div>
    );
}

export default Index;
