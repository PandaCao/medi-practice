import React, { useState, useCallback, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';
import PatientList from '../components/patients/PatientList';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import Spinner from 'react-bootstrap/Spinner';
import { patients as allPatients } from '../data/patients';

const PatientsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [patients, setPatients] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const PAGE_SIZE = 10;
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const fetchPatients = useCallback((query, page) => {
        setIsSearching(true);

        // Simulujeme API call s setTimeout
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
            const paginatedPatients = filteredPatients.slice(
                start,
                start + PAGE_SIZE,
            );

            setPatients(paginatedPatients);
            setTotalPages(total);
            setIsSearching(false);
        }, 300); // Simulujeme 300ms zpoždění
    }, []);

    useEffect(() => {
        fetchPatients(debouncedSearchQuery, currentPage);
    }, [debouncedSearchQuery, currentPage, fetchPatients]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset na první stránku při novém hledání
    };

    const handleAddPatient = () => {
        navigate('/add-patient');
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
                                placeholder="Vyhledat podle jména nebo rodného čísla"
                                aria-label="Search"
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
                            + Přidat Pacienta
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
            />
        </div>
    );
};

export default PatientsPage;
