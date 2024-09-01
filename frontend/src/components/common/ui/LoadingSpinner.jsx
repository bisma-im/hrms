import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const LoadingSpinner = () => {
    return (
        <div style={styles.spinnerContainer}>
        <RotatingLines
            strokeColor="#003366"
            strokeWidth="5"
            animationDuration="0.75"
            height="96"
            width="96"
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
