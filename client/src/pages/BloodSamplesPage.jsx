import React from 'react';
import { Container, Alert } from 'react-bootstrap';

function BloodSamplesPage() {
    return (
        <div className="flex-grow-1 d-flex flex-column">
            <Container fluid className="py-4 flex-grow-1 d-flex flex-column">
            <h2 className="mb-4">Odběry</h2>
            <Alert variant="info" className="d-flex align-items-center">
                <div>
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
        </div>
    );
}

export default BloodSamplesPage;
