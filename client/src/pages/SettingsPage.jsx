import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import {
    BsGear,
    BsBell,
    BsDisplay,
    BsShield,
    BsInfoCircle,
} from 'react-icons/bs';
import { APP_VERSION } from '../config';

function SettingsPage() {
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        appointmentReminders: true,
        systemNotifications: true,
    });

    const [displaySettings, setDisplaySettings] = useState({
        darkMode: false,
        compactView: false,
        showAvatars: true,
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleNotificationChange = (setting) => {
        setNotifications((prev) => ({
            ...prev,
            [setting]: !prev[setting],
        }));
    };

    const handleDisplayChange = (setting) => {
        setDisplaySettings((prev) => ({
            ...prev,
            [setting]: !prev[setting],
        }));
    };

    const handleSaveSettings = () => {
        // Here you would typically save the settings to the backend
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="flex-grow-1 d-flex flex-column">
            <Container fluid className="py-4 flex-grow-1 d-flex flex-column">
            <div className="d-flex align-items-center mb-4">
                <BsGear size={24} className="text-primary me-2" />
                <h2 className="mb-0">Nastavení</h2>
            </div>

            {showSuccess && (
                <Alert variant="success" className="mb-4">
                    Nastavení bylo úspěšně uloženo.
                </Alert>
            )}

            <Card className="mb-4">
                <Card.Header className="d-flex align-items-center">
                    <BsBell className="me-2" />
                    <h5 className="mb-0">Notifikace</h5>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="switch"
                                id="email-notifications"
                                label="Emailové notifikace"
                                checked={notifications.emailNotifications}
                                onChange={() =>
                                    handleNotificationChange(
                                        'emailNotifications',
                                    )
                                }
                            />
                            <Form.Text className="text-muted">
                                Dostávejte upozornění na email o nových
                                rezervacích a změnách.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="switch"
                                id="appointment-reminders"
                                label="Upozornění na schůzky"
                                checked={notifications.appointmentReminders}
                                onChange={() =>
                                    handleNotificationChange(
                                        'appointmentReminders',
                                    )
                                }
                            />
                            <Form.Text className="text-muted">
                                Dostávejte připomenutí o nadcházejících
                                schůzkách.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="switch"
                                id="system-notifications"
                                label="Systémová upozornění"
                                checked={notifications.systemNotifications}
                                onChange={() =>
                                    handleNotificationChange(
                                        'systemNotifications',
                                    )
                                }
                            />
                            <Form.Text className="text-muted">
                                Zobrazovat systémová upozornění v aplikaci.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="mb-4">
                <Card.Header className="d-flex align-items-center">
                    <BsDisplay className="me-2" />
                    <h5 className="mb-0">Zobrazení</h5>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="switch"
                                id="dark-mode"
                                label="Tmavý režim"
                                checked={displaySettings.darkMode}
                                onChange={() => handleDisplayChange('darkMode')}
                            />
                            <Form.Text className="text-muted">
                                Přepnout na tmavý režim zobrazení.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="switch"
                                id="compact-view"
                                label="Kompaktní zobrazení"
                                checked={displaySettings.compactView}
                                onChange={() =>
                                    handleDisplayChange('compactView')
                                }
                            />
                            <Form.Text className="text-muted">
                                Zobrazovat více informací na obrazovce.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="switch"
                                id="show-avatars"
                                label="Zobrazovat avatary"
                                checked={displaySettings.showAvatars}
                                onChange={() =>
                                    handleDisplayChange('showAvatars')
                                }
                            />
                            <Form.Text className="text-muted">
                                Zobrazovat profilové obrázky uživatelů.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="mb-4">
                <Card.Header className="d-flex align-items-center">
                    <BsShield className="me-2" />
                    <h5 className="mb-0">Bezpečnost</h5>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Změna hesla</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Aktuální heslo"
                                className="mb-2"
                            />
                            <Form.Control
                                type="password"
                                placeholder="Nové heslo"
                                className="mb-2"
                            />
                            <Form.Control
                                type="password"
                                placeholder="Potvrzení nového hesla"
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="mb-4">
                <Card.Header className="d-flex align-items-center">
                    <BsInfoCircle className="me-2" />
                    <h5 className="mb-0">O aplikaci</h5>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="mb-1">Verze aplikace</h6>
                            <p className="text-muted mb-0">
                                Verze {APP_VERSION}
                            </p>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <div className="d-flex justify-content-end">
                <Button variant="primary" onClick={handleSaveSettings}>
                    Uložit nastavení
                </Button>
            </div>
        </Container>
        </div>
    );
}

export default SettingsPage;
