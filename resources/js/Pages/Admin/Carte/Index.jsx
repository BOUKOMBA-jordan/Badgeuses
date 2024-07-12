import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const Index = ({ cartes }) => {
    const { props } = usePage();
    return (
        <div className="container">
            <h1>Liste des cartes</h1>
            <Link href={route('admin.carte.create')} className="btn btn-primary">Ajouter une carte</Link>
            {props.flash.success && <div className="alert alert-success mt-2">{props.flash.success}</div>}
            {cartes.length > 0 ? (
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartes.map(carte => (
                            <tr key={carte.id}>
                                <td>{carte.id}</td>
                                <td>{carte.code}</td>
                                <td>
                                    <Link href={route('admin.carte.edit', carte.id)} className="btn btn-warning">Modifier</Link>
                                    <form action={route('admin.carte.destroy', carte.id)} method="POST" style={{ display: 'inline' }}>
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button type="submit" className="btn btn-danger">Supprimer</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucune carte trouvée.</p>
            )}
        </div>
    );
};

export default Index;
