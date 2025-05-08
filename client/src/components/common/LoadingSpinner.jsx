import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({
    message = 'Načítání...',
    showServerWakeupMessage = false,
}) => {
    const [showWakeupMessage, setShowWakeupMessage] = useState(false);

    useEffect(() => {
        let timeout;
        if (showServerWakeupMessage) {
            timeout = setTimeout(() => {
                setShowWakeupMessage(true);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [showServerWakeupMessage]);

    return (
        <div className="text-center p-5">
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">{message}</span>
            </Spinner>
            <div className="mt-2 text-muted">
                <small>{message}</small>
            </div>
            {showWakeupMessage && (
                <div className="mt-3">
                    <div
                        className="alert alert-info d-inline-block"
                        role="alert"
                    >
                        <i className="bi bi-info-circle me-2"></i>
                        <span>
                            Server se probouzí z režimu úsporného provozu.
                            <br />
                            <small className="text-muted">
                                Toto může trvat až 30 sekund.
                            </small>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoadingSpinner;
