// src/pages/PatientsPage.jsx

import React, { useState, useCallback, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';
import PatientList from '../components/patients/PatientList';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { ROUTES } from '../config/routes';
import { patientApi } from '../api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PatientsPage = () => {
    // Stavy pro hledání, stránkování a výsledky
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [patients, setPatients] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const PAGE_SIZE = 10;
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // Načítání pacientů z API
    const fetchPatients = useCallback(async (query, page) => {
        setIsSearching(true);

        try {
            const response = await patientApi.getPatientCards({
                search: query,
                pageIndex: page,
                pageSize: PAGE_SIZE,
            });

            // Transformace dat z API do formátu, který očekává PatientList
            const transformedPatients = response.results.map((patient) => ({
                id: patient.id,
                name: `${patient.first_name} ${patient.last_name}`,
                personalId: patient.birth_number,
                registrationDate: new Date(
                    patient.created_at,
                ).toLocaleDateString('cs-CZ'),
                insurance: patient.insurance_id,
                phone: patient.contact_info?.contact_phone || '',
                email: patient.contact_info?.contact_email || '',
            }));

            setPatients(transformedPatients);
            setTotalPages(response.pageLimit);
        } catch (err) {
            console.error('Error fetching patients:', err);
            setError(
                'Nepodařilo se načíst seznam pacientů. Zkuste to prosím později.',
            );
        } finally {
            setIsSearching(false);
        }
    }, []);

    // Spouští se při změně hledaného výrazu nebo aktuální stránky
    useEffect(() => {
        fetchPatients(debouncedSearchQuery, currentPage);
    }, [debouncedSearchQuery, currentPage, fetchPatients]);

    // Zpracování vstupu hledání
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        const isValidInput =
            /[a-zA-Z0-9čČšŠžŽáéěíóúůýÁÉĚÍÓÚŮÝŘŤŇďĎťŤňŇ]/.test(value.trim()) &&
            !/^[^\w\d]+$/.test(value.trim());

        if (value.length > 0 && (!isValidInput || value.trim() === '')) {
            setError(
                'Neplatný vstup. Zadejte prosím příjmení nebo rodné číslo.',
            );
            return;
        }
        setError(null);
        setCurrentPage(1);
    };

    // Přesměrování na přidání nového pacienta
    const handleAddPatient = () => {
        navigate(ROUTES.PATIENT_ADD);
    };

    // Přesměrování na detail pacienta
    const handlePatientClick = (patientId) => {
        navigate(ROUTES.PATIENT_DETAIL.replace(':id', patientId));
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
                                placeholder="Hledat podle příjmení nebo rodného čísla"
                                aria-label="Hledat"
                                className="bg-light border-0"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
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

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {/* Loading state rozlišený podle toho, zda je aktivní vyhledávání */}
{isSearching ? (
    <LoadingSpinner
        message={searchQuery ? "Vyhledávání pacientů..." : "Načítání pacientů..."}
        showServerWakeupMessage={true}
    />
) : (
    <PatientList
        patients={patients}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPatientClick={handlePatientClick}
        searchQuery={searchQuery}
    />
)}
        </div>
    );
};

export default PatientsPage;
