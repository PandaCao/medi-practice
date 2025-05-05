import React, { useState, useEffect } from 'react';
import { Form, InputGroup, ListGroup, Spinner } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useDebounce } from '../../hooks/useDebounce';
import { patientApi } from '../../api';

function PatientSearchSelect({ value, onChange, onSelect }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        const fetchPatients = async () => {
            if (!debouncedSearchQuery) {
                setPatients([]);
                return;
            }

            setIsSearching(true);
            try {
                const response = await patientApi.getPatientCards({
                    search: debouncedSearchQuery,
                    pageIndex: 1,
                    pageSize: 10,
                });

                const transformedPatients = response.results.map((patient) => ({
                    id: patient.id,
                    name: `${patient.first_name} ${patient.last_name}`,
                    personalId: patient.birth_number,
                }));

                setPatients(transformedPatients);
                setError(null);
            } catch (err) {
                console.error('Error fetching patients:', err);
                setError('Nepodařilo se načíst seznam pacientů');
            } finally {
                setIsSearching(false);
            }
        };

        fetchPatients();
    }, [debouncedSearchQuery]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        onChange(e); // Předáme změnu do parent komponenty
    };

    const handleSelect = (patient) => {
        setSearchQuery(patient.name);
        setPatients([]);
        onSelect(patient);
    };

    return (
        <div className="position-relative">
            <InputGroup>
                <InputGroup.Text className="bg-light border-0">
                    <BsSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Hledat podle jména nebo rodného čísla"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="bg-light border-0"
                />
                {isSearching && (
                    <InputGroup.Text className="bg-light border-0">
                        <Spinner animation="border" size="sm" />
                    </InputGroup.Text>
                )}
            </InputGroup>

            {error && (
                <div className="alert alert-danger mt-2" role="alert">
                    {error}
                </div>
            )}

            {patients.length > 0 && (
                <ListGroup
                    className="position-absolute w-100 shadow-sm"
                    style={{ zIndex: 1000 }}
                >
                    {patients.map((patient) => (
                        <ListGroup.Item
                            key={patient.id}
                            action
                            onClick={() => handleSelect(patient)}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <div className="fw-bold">{patient.name}</div>
                                <small className="text-muted">
                                    {patient.personalId}
                                </small>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}

export default PatientSearchSelect;
