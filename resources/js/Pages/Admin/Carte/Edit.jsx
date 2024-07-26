import React from 'react';
import { useForm } from '@inertiajs/react';

const Edit = ({ carte }) => {
    const { data, setData, put, errors } = useForm({
        numero: carte.numero,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.carte.update', carte.id), {
            onSuccess: () => {
                alert('Carte mise à jour avec succès.');
            },
            onError: () => {
                alert('Erreur lors de la mise à jour de la carte.');
            }
        });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Modifier la Carte</h1>
            <div className="card p-4 shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label htmlFor="numero" className="form-label">Numéro</label>
                        <input
                            id="numero"
                            type="text"
                            className={`form-control ${errors.numero ? 'is-invalid' : ''}`}
                            value={data.numero}
                            onChange={e => setData('numero', e.target.value)}
                        />
                        {errors.numero && <div className="invalid-feedback">{errors.numero}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default Edit;
