import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';

function BloodSamplesPage() {
    return (
        <Container className="py-4">
            <h2 className="mb-4">Odběry</h2>
            <Alert variant="info" className="d-flex align-items-center">
                <BsInfoCircle className="me-2" size={24} />
                <div>
                    <h5 className="alert-heading mb-2">Funkcionalita odběrů</h5>
                    <p className="mb-0">
                        Správa odběrů krve a dalších biologických materiálů bude
                        implementována v budoucí verzi aplikace. Tato sekce bude
                        obsahovat přehled plánovaných odběrů, historii
                        provedených odběrů a možnost vytváření nových odběrů pro
                        pacienty.
                    </p>
                </div>
            </Alert>
        </Container>
    );
}

export default BloodSamplesPage;
