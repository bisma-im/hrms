import React from 'react';

const LoadingSpinner = () => {
    return (
        <>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
            <div style={styles.spinnerContainer}>
                <div style={styles.spinner}></div>
            </div>
        </>
    );
};

// Inline styles as previously defined
const styles = {
    spinnerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
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
