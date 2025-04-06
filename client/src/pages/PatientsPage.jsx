// src/pages/PatientsPage.jsx

import React, { useState, useCallback, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';
import PatientList from '../components/patients/PatientList';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { patients as allPatients } from '../data/patients';
import { ROUTES } from '../config/routes';

const PatientsPage = () => {
    // Stavy pro hledání, stránkování a výsledky
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [patients, setPatients] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();
    const PAGE_SIZE = 10;
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // Načítání pacientů (simulace API volání)
    const fetchPatients = useCallback((query, page) => {
        setIsSearching(true);

        setTimeout(() => {
            const filteredPatients = allPatients.filter((patient) => {
                const searchLower = query.toLowerCase();
                return (
                    patient.name.toLowerCase().includes(searchLower) ||
                    patient.personalId.toLowerCase().includes(searchLower)
                );
            });

            const total = Math.ceil(filteredPatients.length / PAGE_SIZE);
            const start = (page - 1) * PAGE_SIZE;
            const paginatedPatients = filteredPatients.slice(start, start + PAGE_SIZE);

            setPatients(paginatedPatients);
            setTotalPages(total);
            setIsSearching(false);
        }, 300); // Simulace zpoždění odpovědi serveru
    }, []);

    // Spouští se při změně hledaného výrazu nebo aktuální stránky
    useEffect(() => {
        fetchPatients(debouncedSearchQuery, currentPage);
    }, [debouncedSearchQuery, currentPage, fetchPatients]);

    // Zpracování vstupu hledání
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    // Přesměrování na přidání nového pacienta
    const handleAddPatient = () => {
        navigate(ROUTES.PATIENT_ADD);
    };

    // Přesměrování na detail pacienta
    const handlePatientClick = (patientId) => {
        navigate(ROUTES.PATIENT_DETAIL.replace(':id', patientId)); // Výměna :id za skutečné ID
    };

    return (
        <div>
            <Container fluid className="px-0">
                <Row className="align-items-center mb-4 g-3">
                    <Col xs={12} md={6}>
                        <InputGroup>
                            <InputGroup.Text className="bg-light border-0">
                                <BsSearch className="text-muted" />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Hledat podle jména nebo rodného čísla"
                                aria-label="Hledat"
                                className="bg-light border-0"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            {isSearching && (
                                <InputGroup.Text className="bg-light border-0">
                                    <Spinner animation="border" size="sm" />
                                </InputGroup.Text>
                            )}
                        </InputGroup>
                    </Col>
                    <Col
                        xs={12}
                        md={6}
                        className="d-flex justify-content-md-end gap-2"
                    >
                        <Button variant="primary" onClick={handleAddPatient}>
                            + Přidat pacienta
                        </Button>
                    </Col>
                </Row>
            </Container>

            <PatientList
                patients={patients}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                isLoading={isSearching}
                onPatientClick={handlePatientClick} // Předáváme funkci pro kliknutí
            />
        </div>
    );
};

export default PatientsPage;
