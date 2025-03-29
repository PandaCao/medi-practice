import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs';
import PatientList from '../components/patients/PatientList';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PatientsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
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
                                placeholder="Vyhledat podle jména nebo rodnoho čísla"
                                aria-label="Search"
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
                            + Přidat Pacienta
                        </Button>
                    </Col>
                </Row>
            </Container>
            <PatientList searchQuery={searchQuery} />
        </div>
    );
};

export default PatientsPage;
