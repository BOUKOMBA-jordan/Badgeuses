import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { route } from 'ziggy-js';

const Index = ({ apprenants, disciplines }) => {
    // Vérification si apprenants est null ou undefined
    if (!apprenants) {
        return (
            <div className="container mt-5">
                <h1 className="mb-4">Liste des Apprenants</h1>
                <p>Chargement...</p>
            </div>
        );
    }

   {/* // Vérification si disciplines est null ou undefined
    if (!disciplines) {
        return (
            <div className="container mt-5">
                <h1 className="mb-4">Liste des Apprenants</h1>
                <p>Chargement des disciplines...</p>
            </div>
        );
    }*/}

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Liste des Apprenants</h1>
            
            {/* Bouton pour ajouter un nouvel apprenant */}
            <Link href={route('admin.apprenant.create')} className="btn btn-primary mb-3">
                Ajouter un Apprenant
            </Link>

            {/* Tableau pour afficher la liste des apprenants */}
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Discipline</th>
                            <th>Numéro de Carte</th>
                            <th>Promotion</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapping à travers la liste des apprenants pour afficher chaque ligne */}
                        {apprenants.map(apprenant => (
                            <tr key={apprenant.id}>
                                <td>{apprenant.nom}</td>
                                <td>{apprenant.prenom}</td>
                                <td>{apprenant.promotion}</td>
                                <td>
                                    {/* Liste déroulante pour choisir la discipline */}
                                    <select
                                        value={apprenant.discipline_id || ''}
                                        onChange={(e) => updateApprenant(apprenant.id, { discipline_id: e.target.value })}
                                        className="form-select"
                                    >
                                        <option value="">Choisir une discipline</option>
                                        {disciplines.map(discipline => (
                                            <option key={discipline.id} value={discipline.id}>{discipline.nom}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    {/* Champ d'entrée pour modifier le numéro de carte */}
                                    <input
                                        type="text"
                                        value={apprenant.carte_id || ''}
                                        onChange={(e) => updateApprenant(apprenant.id, { carte_id: e.target.value })}
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    {/* Lien pour éditer l'apprenant */}
                                    <Link href={route('admin.apprenant.edit', apprenant.id)} className="btn btn-sm btn-warning me-2">
                                        Editer
                                    </Link>
                                    
                                    {/* Bouton pour supprimer l'apprenant */}
                                    <button 
                                        onClick={() => handleDelete(apprenant.id)} 
                                        className="btn btn-sm btn-danger">
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
