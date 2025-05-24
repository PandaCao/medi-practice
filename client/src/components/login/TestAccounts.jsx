import React from 'react';

const TestAccounts = ({ onHide }) => {
    return (
        <div className="text-center mt-4">
            <div className="text-muted small mb-2">Testovací účty:</div>
            <div className="d-flex flex-column align-items-center gap-3">
                <div className="col-12">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-3">
                            <div
                                className="fw-bold mb-2 text-primary"
                                style={{ fontSize: '1.1rem' }}
                            >
                                Doktoři
                            </div>
                            <div className="d-flex flex-column gap-2 align-items-center">
                                <div>
                                    <div className="fw-bold">MUDr. Jan Suk</div>
                                    <div className="small text-muted">
                                        Uživatel: jsuk
                                        <br />
                                        Heslo: jsuk
                                    </div>
                                </div>
                                <div>
                                    <div className="fw-bold">
                                        MUDr. Vítězslav Podivínský
                                    </div>
                                    <div className="small text-muted">
                                        Uživatel: vpodivinsky
                                        <br />
                                        Heslo: vpodivinsky
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-3">
                            <div
                                className="fw-bold mb-2 text-success"
                                style={{ fontSize: '1.1rem' }}
                            >
                                Sestry
                            </div>
                            <div className="d-flex flex-column gap-2 align-items-center">
                                <div>
                                    <div className="fw-bold">
                                        Bc. Marie Nováková
                                    </div>
                                    <div className="small text-muted">
                                        Uživatel: mnovakova
                                        <br />
                                        Heslo: mnovakova
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-link mt-3"
                style={{ fontSize: '0.9rem' }}
                onClick={onHide}
            >
                Skrýt testovací účty
            </button>
        </div>
    );
};

export default TestAccounts;
