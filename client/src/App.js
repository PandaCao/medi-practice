import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Router';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
