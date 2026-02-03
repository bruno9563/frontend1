import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
        localStorage.removeItem('userId');
        navigate('/');
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/criar')}>
                🎁 Presente Perfeito
            </div>
            <div className="navbar-links">
                <button
                    className={`nav-btn ${location.pathname === '/criar' ? 'active' : ''}`}
                    onClick={() => navigate('/criar')}
                >
                    Criar Presente 🎁
                </button>
                <button
                    className={`nav-btn ${location.pathname === '/meus-presentes' ? 'active' : ''}`}
                    onClick={() => navigate('/meus-presentes')}
                >
                    Meus Presentes 📋
                </button>
                <button className="nav-btn btn-logout" onClick={handleLogout}>
                    Sair ❌
                </button>
            </div>
        </nav>
    );
}
