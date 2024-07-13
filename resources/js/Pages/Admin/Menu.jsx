import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from 'ziggy-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBook, faMap } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
    const { url } = usePage();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg"> {/* Utilisation de la classe bg-primary pour la couleur de fond */}
            <div className="container-fluid">
                <Link className="navbar-brand" href="#">Mon Application</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link 
                                href={route('admin.apprenant.index').url} // Utilisation de route('...').url
                                className={`nav-link ${url.pathname === route('admin.apprenant.index').url ? 'active' : ''}`}>
                                <FontAwesomeIcon icon={faUsers} className="me-1" />
                                Apprenants
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                href={route('admin.discipline.index').url} // Utilisation de route('...').url
                                className={`nav-link ${url.pathname === route('admin.discipline.index').url ? 'active' : ''}`}>
                                <FontAwesomeIcon icon={faBook} className="me-1" />
                                Disciplines
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                href={route('admin.carte.index').url} // Utilisation de route('...').url
                                className={`nav-link ${url.pathname === route('admin.carte.index').url ? 'active' : ''}`}>
                                <FontAwesomeIcon icon={faMap} className="me-1" />
                                Carte
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
