import React from 'react';
import { Button } from 'react-bootstrap';
import { BsPencil } from 'react-icons/bs';
import { RiFileList2Line } from 'react-icons/ri';

const PatientDetailCard = ({ patient, onUpdate, onERecept }) => {
    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="d-flex align-items-center gap-2">
                    <div className="text-muted">Pacient:</div>
                    <h4 className="mb-0">{patient.name}</h4>
                </div>
                <div className="d-flex gap-2">
                    <Button
                        variant="primary"
                        size="sm"
                        className="d-inline-flex align-items-center gap-2"
                        onClick={onUpdate}
                    >
                        <BsPencil />
                        <span className="d-none d-sm-inline">Upravit</span>
                    </Button>
                    <Button
                        variant="light"
                        size="sm"
                        className="d-inline-flex align-items-center gap-2 border"
                        onClick={onERecept}
                    >
                        <RiFileList2Line />
                        <span className="d-none d-sm-inline">E-Recept</span>
                    </Button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="mb-4">
                        <div className="text-muted mb-2">Základní info:</div>
                        <div className="mb-1">
                            <div className="text-muted small">
                                Datum narození:
                            </div>
                            <div>12/3/1986</div>
                        </div>
                        <div className="mb-1">
                            <div className="text-muted small">Rodné číslo:</div>
                            <div>860312/5412</div>
                        </div>
                        <div className="mb-1">
                            <div className="text-muted small">
                                Datum registrace:
                            </div>
                            <div>27/12/2024</div>
                        </div>
                        <div>
                            <div className="text-muted small">
                                Zdravotní pojišťovna:
                            </div>
                            <div>Česká průmyslová zdravotní pojišťovna</div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="mb-4">
                        <div className="text-muted mb-2">Kontaktní údaje:</div>
                        <div className="mb-1">
                            <div className="text-muted small">Email:</div>
                            <div>Petr.horak@gmail.com</div>
                        </div>
                        <div>
                            <div className="text-muted small">Telefon:</div>
                            <div>+420 777 564 123</div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="mb-4">
                        <div className="text-muted mb-2">Kontaktní osoba:</div>
                        <div className="mb-1">
                            <div className="text-muted small">Jméno:</div>
                            <div>Jana Horáková</div>
                        </div>
                        <div className="mb-1">
                            <div className="text-muted small">Vztah:</div>
                            <div>manželka</div>
                        </div>
                        <div>
                            <div className="text-muted small">Telefon:</div>
                            <div>+420 777 565 868</div>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div>
                <div className="text-muted mb-2">Poslední návštěva:</div>
                <div className="d-flex gap-5">
                    <div>
                        <div className="text-muted small">Datum:</div>
                        <div>2/3/2025</div>
                    </div>
                    <div>
                        <div className="text-muted small">Výška:</div>
                        <div>180 cm</div>
                    </div>
                    <div>
                        <div className="text-muted small">Váha:</div>
                        <div>90 kg</div>
                    </div>
                    <div>
                        <div className="text-muted small">Krevní tlak:</div>
                        <div>140/90 mmHg</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetailCard;
