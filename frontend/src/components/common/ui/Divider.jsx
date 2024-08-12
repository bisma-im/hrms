import React from 'react';

const Divider = ({ isVertical = false }) => {
    const style = {
        backgroundColor: '#ccc',
        margin: isVertical ? '0 20px' : '20px 0',
        width: isVertical ? '1px' : '100%',
        height: isVertical ? '100%' : '1px',
    };

    return <div style={style} />;
};

export default Divider;
