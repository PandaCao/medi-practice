import React from 'react';

const SignaturePreview = ({ text, onClick, compact = false }) => {
    if (compact) {
        return (
            <div
                style={{
                    fontFamily: 'Brush Script MT, cursive',
                    fontSize: '1.2rem',
                    color: '#000',
                    borderBottom: '2px solid #000',
                    padding: '0 10px',
                    display: 'inline-block',
                    cursor: onClick ? 'pointer' : 'default',
                }}
            >
                {text}
            </div>
        );
    }
    return (
        <div
            onClick={onClick}
            className="border rounded p-2 text-center cursor-pointer hover-bg-light"
            style={{
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: '#f8f9fa',
                border: '2px dashed #dee2e6',
                transition: 'all 0.2s ease-in-out',
            }}
        >
            {text ? (
                <div
                    style={{
                        fontFamily: 'Brush Script MT, cursive',
                        fontSize: '1.5rem',
                        color: '#007bff',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    }}
                >
                    {text}
                </div>
            ) : (
                <div className="text-muted">Klikněte pro přidání podpisu</div>
            )}
        </div>
    );
};

export default SignaturePreview;
