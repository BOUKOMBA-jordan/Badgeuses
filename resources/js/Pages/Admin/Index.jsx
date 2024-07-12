// resources/js/Pages/Apprenant/Index.jsx

import React from 'react';
import { Link, route } from '@inertiajs/react';

const Index = ({ apprenants }) => {
    return (
        <div className="container">
            <h1>Liste des apprenants</h1>
            <Link href={route('apprenant.create')} className="btn btn-primary">Ajouter un apprenant</Link>

            {apprenants.length > 0 ? (
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Id de la carte</th>
                            <th>Promotion</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apprenants.map(apprenant => (
                            <tr key={apprenant.id}>
                                <td>{apprenant.id}</td>
                                <td>{apprenant.nom}</td>
                                <td>{apprenant.prenom}</td>
                                <td>{apprenant.carte_id}</td>
                                <td>{apprenant.promotion}</td>
                                <td>
                                    <Link href={route('apprenant.show', apprenant.id)} className="btn btn-info">Voir</Link>
                                    <Link href={route('apprenant.edit', apprenant.id)} className="btn btn-warning">Modifier</Link>
                                    <form action={route('apprenant.destroy', apprenant.id)} method="POST" style={{ display: 'inline' }}>
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button type="submit" className="btn btn-danger">Supprimer</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun apprenant trouvé.</p>
            )}
        </div>
    );
};

export default Index;
