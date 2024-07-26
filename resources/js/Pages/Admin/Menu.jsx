import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from 'ziggy-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBook, faMap } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/Menu.css'; // Assurez-vous d'inclure votre fichier CSS personnalisé

const Menu = () => {
    const { url } = usePage();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link 
                            href={route('admin.apprenant.index')}
                            className={`nav-link d-flex align-items-center ${url.pathname === route('admin.apprenant.index') ? 'active' : ''}`}
                        >
                            <FontAwesomeIcon icon={faUsers} className="me-2" />
                            <span>Apprenants</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            href={route('admin.discipline.index')}
                            className={`nav-link d-flex align-items-center ${url.pathname === route('admin.discipline.index') ? 'active' : ''}`}
                        >
                            <FontAwesomeIcon icon={faBook} className="me-2" />
                            <span>Disciplines</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            href={route('admin.carte.index')}
                            className={`nav-link d-flex align-items-center ${url.pathname === route('admin.carte.index') ? 'active' : ''}`}
                        >
                            <FontAwesomeIcon icon={faMap} className="me-2" />
                            <span>Carte</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Menu;
