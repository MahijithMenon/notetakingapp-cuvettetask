import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ProfilePicture = ({ userName, color, style }) => {
  const [abbreviatedName, setAbbreviatedName] = useState('');

  useEffect(() => {
    setAbbreviatedName(abbreviateName(userName));
  }, [userName]);
  const abbreviateName = (name) => {
    let splitName = name.split(' ');
    if (splitName.length === 1) return splitName[0].slice(0, 2).toUpperCase();
    const firstName = splitName[0];
    const lastName = splitName[1];
    return (firstName[0] + lastName[0]).toUpperCase();
  };
  return (
    <div
      style={{
        width: '60.9px',
        height: '60.9px',
        backgroundColor: color,
        color: '#FFFFFF',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '5px',
        padding: '10px',
        marginRight: '20px',
        ...style,
      }}
    >
      {abbreviatedName}
    </div>
  );
};

ProfilePicture.propTypes = {
  userName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  style: PropTypes.object,
};
export default ProfilePicture;
