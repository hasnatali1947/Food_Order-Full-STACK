import React from 'react'

export default function Loading() {
    return (
        <div style={loadingStyle}>
            <div style={spinnerStyle}></div>
        </div>
    );
}

const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
};

const spinnerStyle = {
    border: '4px solid rgba(0, 0, 0, 0.3)',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    animation: 'spin 1s linear infinite',
};

const styles = document.styleSheets[0];
styles.insertRule(`@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`, styles.cssRules.length);
