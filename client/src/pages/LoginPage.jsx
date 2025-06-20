import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';
import TestAccounts from '../components/login/TestAccounts';

const LoginPage = () => {
    const [showTestAccounts, setShowTestAccounts] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError('Nesprávné přihlašovací údaje');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <Card className="shadow-sm" style={{ width: '400px' }}>
                <Card.Body className="p-4">
                    <div className="text-center mb-4">
                        <img
                            src={logo}
                            alt="MediPractise"
                            style={{ height: '60px' }}
                            className="mb-3"
                        />
                        <h4 className="text-primary mb-0">Přihlášení</h4>
                    </div>

                    {error && (
                        <Alert variant="danger" className="mb-3">
                            {error}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Uživatelské jméno</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Heslo</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </Form.Group>
                        {isLoading ? (
                            <div className="d-flex flex-column align-items-center mb-2">
                                <span
                                    className="spinner-border text-primary"
                                    role="status"
                                />
                                <div className="mt-2 text-muted">
                                    Přihlašování…
                                </div>
                            </div>
                        ) : (
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100"
                            >
                                Přihlásit se
                            </Button>
                        )}
                    </Form>

                    {/* Testovací účty – zobrazí se až po kliknutí na tlačítko */}
                    {showTestAccounts ? (
                        <TestAccounts
                            onHide={() => setShowTestAccounts(false)}
                        />
                    ) : (
                        <div className="text-center mt-4">
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => setShowTestAccounts(true)}
                            >
                                Zobrazit testovací účty
                            </button>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default LoginPage;
