import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../CriarDeclaracao/style.css'; // Reutiliza os estilos

function MeusPresentes() {
    const navigate = useNavigate();
    const [presentes, setPresentes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/');
            return;
        }

        api.get(`/users/${userId}/gifts`)
            .then(response => {
                setPresentes(response.data);
            })
            .catch(err => {
                console.error("Erro ao buscar presentes", err);
                alert("Erro ao buscar seus presentes.");
            })
            .finally(() => setCarregando(false));
    }, [navigate]);

    return (
        <div className="container-geral">
            <div className="login-box" style={{ maxWidth: '600px', width: '90%' }}>
                <h1 style={{ color: 'white', marginBottom: '20px' }}>Meus Presentes 🎁</h1>

                {carregando ? (
                    <p style={{ color: 'white' }}>Carregando...</p>
                ) : (
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {presentes.length === 0 ? (
                            <p style={{ color: 'white' }}>Você ainda não criou nenhum presente.</p>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {presentes.map(gift => (
                                    <li key={gift.id} style={{
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        padding: '15px',
                                        margin: '10px 0',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexWrap: 'wrap'
                                    }}>
                                        <div style={{ textAlign: 'left', flex: 1, minWidth: '200px' }}>
                                            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#ffeb3b' }}>
                                                Criado em: {new Date(gift.createdAt).toLocaleDateString()}
                                            </p>
                                            <p style={{ margin: 0, fontSize: '0.9em', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                                                {gift.mensagem}
                                            </p>
                                        </div>
                                        <button
                                            className="btn-principal"
                                            style={{ padding: '8px 15px', fontSize: '0.9em', marginLeft: '10px', marginTop: '5px' }}
                                            onClick={() => window.open(`${window.location.origin}/presente/${gift.id}`, '_blank')}
                                        >
                                            Ver Link 🔗
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                <button
                    className="btn-secondary"
                    onClick={() => navigate('/criar')}
                    style={{ marginTop: '20px', width: '100%', padding: '12px', cursor: 'pointer', backgroundColor: '#ffffff', color: '#a41515', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
                >
                    ⬅️ Voltar e Criar Novo
                </button>
            </div>
        </div>
    );
}

export default MeusPresentes;
