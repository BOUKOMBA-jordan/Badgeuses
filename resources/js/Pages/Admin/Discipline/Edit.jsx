import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Edit = ({ discipline }) => {
    const [nom, setNom] = useState(discipline.nom);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        Inertia.put(route('admin.discipline.update', { id: discipline.id }), { nom })
            .then(() => {
                // Redirection ou autre action après la mise à jour réussie
                // Inertia.visit(route('admin.discipline.index')); // Exemple de redirection
            })
            .catch((error) => {
                setError('Une erreur est survenue lors de la mise à jour de la discipline.');
                console.log(error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Modifier la discipline</h1>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        aria-describedby="nomHelp"
                        required
                    />
                    {error && <div id="nomHelp" className="invalid-feedback">{error}</div>}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Enregistrement en cours...' : 'Enregistrer'}
                </button>
            </form>
        </div>
    );
}

export default Edit;