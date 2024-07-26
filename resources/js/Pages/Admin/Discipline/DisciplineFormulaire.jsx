import React from 'react';
import { useForm } from '@inertiajs/react';

const ApprenantForm = ({ apprenant, disciplines }) => {
    const { data, setData, post, put, errors } = useForm({
        nom: apprenant ? apprenant.nom : '',
        prenom: apprenant ? apprenant.prenom : '',
        carte_id: apprenant ? apprenant.carte_id : '',
        promotion: apprenant ? apprenant.promotion : '',
        disciplines: apprenant ? apprenant.disciplines.map(d => d.id) : [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (apprenant) {
            put(route('apprenant.update', apprenant.id));
        } else {
            post(route('apprenant.store'));
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">{apprenant ? 'Modifier Apprenant' : 'Créer Apprenant'}</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                        value={data.nom}
                        onChange={e => setData('nom', e.target.value)}
                        aria-describedby="nomHelp"
                        required
                    />
                    {errors.nom && <div id="nomHelp" className="invalid-feedback">{errors.nom}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom</label>
                    <input
                        type="text"
                        id="prenom"
                        className={`form-control ${errors.prenom ? 'is-invalid' : ''}`}
                        value={data.prenom}
                        onChange={e => setData('prenom', e.target.value)}
                        aria-describedby="prenomHelp"
                        required
                    />
                    {errors.prenom && <div id="prenomHelp" className="invalid-feedback">{errors.prenom}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="carte_id" className="form-label">Carte ID</label>
                    <input
                        type="text"
                        id="carte_id"
                        className={`form-control ${errors.carte_id ? 'is-invalid' : ''}`}
                        value={data.carte_id}
                        onChange={e => setData('carte_id', e.target.value)}
                        aria-describedby="carteIdHelp"
                        required
                    />
                    {errors.carte_id && <div id="carteIdHelp" className="invalid-feedback">{errors.carte_id}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="promotion" className="form-label">Promotion</label>
                    <input
                        type="text"
                        id="promotion"
                        className={`form-control ${errors.promotion ? 'is-invalid' : ''}`}
                        value={data.promotion}
                        onChange={e => setData('promotion', e.target.value)}
                        aria-describedby="promotionHelp"
                        required
                    />
                    {errors.promotion && <div id="promotionHelp" className="invalid-feedback">{errors.promotion}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="disciplines" className="form-label">Disciplines</label>
                    <select
                        id="disciplines"
                        multiple
                        className={`form-control ${errors.disciplines ? 'is-invalid' : ''}`}
                        value={data.disciplines}
                        onChange={e => setData('disciplines', [...e.target.selectedOptions].map(option => option.value))}
                        aria-describedby="disciplinesHelp"
                    >
                        {disciplines.map(discipline => (
                            <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
                        ))}
                    </select>
                    {errors.disciplines && <div id="disciplinesHelp" className="invalid-feedback">{errors.disciplines}</div>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={Object.keys(errors).length > 0}>
                    {apprenant ? 'Mettre à jour' : 'Créer'}
                </button>
            </form>
        </div>
    );
};

export default ApprenantForm;
