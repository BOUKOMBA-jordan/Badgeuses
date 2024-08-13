import PropTypes from 'prop-types';

const ApprenantsSelect = ({ apprenants, onChange }) => {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option value="">Sélectionner un apprenant</option>
      {apprenants.map((apprenant) => (
        <option key={apprenant.id} value={apprenant.id}>
          {apprenant.nom} {apprenant.prenom}
        </option>
      ))}
    </select>
  );
};

ApprenantsSelect.propTypes = {
  apprenants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nom: PropTypes.string.isRequired,
      prenom: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ApprenantsSelect;
