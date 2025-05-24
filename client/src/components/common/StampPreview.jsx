import React from 'react';

const StampPreview = ({ text, onClick }) => (
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
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '1.2rem',
                    color: '#dc3545',
                    transform: 'rotate(-5deg)',
                    border: '2px solid #dc3545',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}
            >
                {text}
            </div>
        ) : (
            <div className="text-muted">Klikněte pro přidání razítka</div>
        )}
    </div>
);

export default StampPreview;
