import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import { AuthProvider } from './contexts/AuthContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>,
)

