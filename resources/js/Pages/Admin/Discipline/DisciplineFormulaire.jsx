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
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nom</label>
                <input type="text" className="form-control" value={data.nom} onChange={e => setData('nom', e.target.value)} />
                {errors.nom && <div className="text-danger">{errors.nom}</div>}
            </div>

            <div className="form-group">
                <label>Prénom</label>
                <input type="text" className="form-control" value={data.prenom} onChange={e => setData('prenom', e.target.value)} />
                {errors.prenom && <div className="text-danger">{errors.prenom}</div>}
            </div>

            <div className="form-group">
                <label>Carte ID</label>
                <input type="text" className="form-control" value={data.carte_id} onChange={e => setData('carte_id', e.target.value)} />
                {errors.carte_id && <div className="text-danger">{errors.carte_id}</div>}
            </div>

            <div className="form-group">
                <label>Promotion</label>
                <input type="text" className="form-control" value={data.promotion} onChange={e => setData('promotion', e.target.value)} />
                {errors.promotion && <div className="text-danger">{errors.promotion}</div>}
            </div>

            <div className="form-group">
                <label>Disciplines</label>
                <select multiple className="form-control" value={data.disciplines} onChange={e => setData('disciplines', [...e.target.selectedOptions].map(option => option.value))}>
                    {disciplines.map(discipline => (
                        <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
                    ))}
                </select>
                {errors.disciplines && <div className="text-danger">{errors.disciplines}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
    );
};

export default ApprenantForm;
