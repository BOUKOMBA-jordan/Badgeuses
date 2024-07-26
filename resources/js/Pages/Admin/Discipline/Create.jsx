import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Create = () => {
    const [nom, setNom] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        Inertia.post(route('admin.discipline.store'), { nom })
            .then(() => {
                // Redirection ou autre action après la création réussie
                // Inertia.visit(route('admin.discipline.index')); // Exemple de redirection
            })
            .catch((error) => {
                setError('Une erreur est survenue lors de la création de la discipline.');
                console.log(error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Créer une nouvelle discipline</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
                        <div className="mb-3">
                            <label htmlFor="nom" className="form-label fw-bold">Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button 
                            type="submit" 
                            className={`btn btn-primary ${isSubmitting ? 'disabled' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Création en cours...' : 'Créer'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Create;
