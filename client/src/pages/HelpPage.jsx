import React from 'react';
import { Container, Card, Accordion } from 'react-bootstrap';
import {
    BsQuestionCircle,
    BsPeople,
    BsCalendar,
    BsClock,
    BsGrid,
} from 'react-icons/bs';

function HelpPage() {
    return (
        <div className="flex-grow-1 d-flex flex-column">
            <Container fluid className="py-4 flex-grow-1 d-flex flex-column">
            <div className="d-flex align-items-center mb-4">
                <BsQuestionCircle size={24} className="text-primary me-2" />
                <h2 className="mb-0">Nápověda</h2>
            </div>

            <Accordion defaultActiveKey="0" className="mb-4">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <BsPeople className="me-2" />
                        Karty pacientů
                    </Accordion.Header>
                    <Accordion.Body>
                        <p>Sekce karet pacientů umožňuje:</p>
                        <ul>
                            <li>
                                Vyhledávání pacientů podle příjmení nebo rodného
                                čísla
                            </li>
                            <li>Přidávání nových pacientů do systému</li>
                            <li>Zobrazení detailních informací o pacientovi</li>
                            <li>Úpravu údajů pacienta</li>
                            <li>Přehled vyšetření a receptů pacienta</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <BsCalendar className="me-2" />
                        Rezervační systém
                    </Accordion.Header>
                    <Accordion.Body>
                        <p>V rezervačním systému můžete:</p>
                        <ul>
                            <li>Vytvářet nové rezervace pro pacienty</li>
                            <li>
                                Vybrat typ vyšetření (Preventivní prohlídka,
                                Vyšetření, Krevní test, atd.)
                            </li>
                            <li>Zadat datum a čas vyšetření</li>
                            <li>Přidat poznámky k rezervaci</li>
                            <li>Zobrazit přehled všech rezervací</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <BsClock className="me-2" />
                        Dnešní schůzky
                    </Accordion.Header>
                    <Accordion.Body>
                        <p>Sekce dnešních schůzek poskytuje:</p>
                        <ul>
                            <li>Přehled všech rezervací na aktuální den</li>
                            <li>Rychlý přístup k detailům pacientů</li>
                            <li>Přehled typů plánovaných vyšetření</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        <BsGrid className="me-2" />
                        Odběry
                    </Accordion.Header>
                    <Accordion.Body>
                        <p>Sekce odběrů bude v budoucí verzi obsahovat:</p>
                        <ul>
                            <li>Přehled plánovaných odběrů</li>
                            <li>Historie provedených odběrů</li>
                            <li>
                                Možnost vytváření nových odběrů pro pacienty
                            </li>
                            <li>Správu biologických materiálů</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Card className="mt-4">
                <Card.Body>
                    <h5 className="card-title">Kontaktní informace</h5>
                    <p className="card-text">
                        Pokud potřebujete pomoc nebo máte jakékoliv dotazy,
                        neváhejte nás kontaktovat:
                    </p>
                    <ul>
                        <li>Email: podpora@medipractise.cz</li>
                        <li>Telefon: +420 123 456 789</li>
                        <li>Pracovní doba: Po-Pá 8:00 - 16:00</li>
                    </ul>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
}

export default HelpPage;
