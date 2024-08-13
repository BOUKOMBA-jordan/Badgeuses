import React from 'react';


const ApprenantsTable = ({data}) => {
    

   //console.log(data);

        return (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Discipline</th>
                    <th>Jour</th>
                    <th>Arrivée</th>
                    <th>Départ</th>
                    <th>Numero</th>
                    <th>promotion</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nom_apprenant}</td>
                      <td>{item.prenom_apprenant}</td>
                      <td>{item.discipline}</td>
                      <td>{item.jour}</td>
                      <td>{item.heure_arrive}</td>
                      <td>{item.heure_depart}</td>
                      <td>{item.numero}</td>
                      <td>{item.promotion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
};

export default ApprenantsTable;
