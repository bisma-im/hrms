import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const LoadingSpinner = ({ size = 96, color = "#003366" }) => {
    return (
        <div style={styles.spinnerContainer}>
        <RotatingLines
            strokeColor={color}
            strokeWidth="5"
            animationDuration="0.75"
            height={size}
            width={size}
            visible={true}
            style={styles.spinner}
        />
        </div>
    );
};

// Inline styles as previously defined
const styles = {
    spinnerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '5px solid rgba(0,0,0,0.1)',
        borderTop: '5px solid blue',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    }
};

export default LoadingSpinner;
