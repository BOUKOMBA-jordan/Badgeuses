import React from 'react';
import ApprenantForm from './ApprenantFormulaire';
import { Container } from 'react-bootstrap';

const Create = ({ disciplines, cartes }) => {
    const apprenant = null; // Pour la création, l'apprenant est nul

    return (
        <Container className="mt-5">
           
            <ApprenantForm apprenant={apprenant} disciplines={disciplines} cartes={cartes} />
        </Container>
    );
};

export default Create;
