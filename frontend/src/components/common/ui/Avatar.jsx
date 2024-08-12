import React from 'react';

const Avatar = ({ src, name, size = 50 }) => {
    const style = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '10%',
        objectFit: 'cover',
        display: 'inline-block',
        backgroundColor: '#f2f2f2',  // A light grey background
        color: '#666',               // Darker text color for initials
        textAlign: 'center',
        lineHeight: `${size}px`,     // Center initials vertically
        fontSize: `${size / 3}px`,   // Adjust font size based on avatar size
        fontWeight: 'bold',
        border: '1px solid #ddd'     // Optional border
    };

    const renderInitials = () => {
        return (
            name.split(' ').map(part => part[0]).join('')
        );
    };

    return (
        <div style={style} className='m-3'>
            {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : renderInitials()}
        </div>
    );
};

export default Avatar;
