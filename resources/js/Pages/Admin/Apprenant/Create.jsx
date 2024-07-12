import React from 'react';
import { useForm } from '@inertiajs/react';

const Create = () => {
    const { data, setData, post, errors } = useForm({
        nom: '',
        prenom: '',
        carte_id: '',
        promotion: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.apprenant.store'));
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
            <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
    );
};

export default Create;