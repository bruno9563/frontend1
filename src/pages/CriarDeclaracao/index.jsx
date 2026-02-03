import Navbar from '../../components/Navbar';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

function CriarDeclaracao() {
    const navigate = useNavigate();
    const textoRef = useRef();
    const dataRef = useRef();
    const [linkGerado, setLinkGerado] = useState('');
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/');
        }
    }, [navigate]);

    async function handleSalvar() {
        setCarregando(true);
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert("Erro: Usuário não identificado. Faça login novamente.");
            setCarregando(false);
            return;
        }

        const payload = {
            userId: userId,
            mensagem: textoRef.current.value,
            dataInicio: dataRef.current.value,
        };

        try {
            // Agora usamos POST /gifts para criar um novo presente SEMPRE
            const response = await api.post('/gifts', payload);

            // O backend retorna o objeto Gift criado, incluindo o ID único
            const giftId = response.data.id;

            // Gera o link usando o ID do presente
            const urlFinal = `${window.location.origin}/presente/${giftId}`;
            setLinkGerado(urlFinal);

            alert("Sua declaração foi criada com sucesso! ❤️");
        } catch (err) {
            console.error(err);
            alert("Erro ao criar o presente. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="container-geral" style={{ flexDirection: 'column', paddingTop: '80px' }}>
            <Navbar />
            <div className="gift-box">
                <h1>Criar Novo Presente</h1>

                <p className="label-input">Sua mensagem de amor:</p>
                <textarea
                    ref={textoRef}
                    placeholder="Escreva aqui o que você sente..."
                    className="input-estilizado"
                    style={{ height: '150px', resize: 'none' }}
                />

                <p className="label-input">Quando tudo começou?</p>
                <input
                    ref={dataRef}
                    type="datetime-local"
                    className="input-estilizado"
                />

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button
                        className="btn-principal"
                        onClick={handleSalvar}
                        disabled={carregando}
                        style={{ flex: 1 }}
                    >
                        {carregando ? "Criando..." : "Criar Presente 🎁"}
                    </button>

                    <button
                        className="btn-secondary"
                        onClick={() => navigate('/meus-presentes')}
                        style={{ flex: 1, backgroundColor: '#6c757d', color: 'white' }}
                    >
                        Meus Presentes 📋
                    </button>
                </div>

                {linkGerado && (
                    <div className="link-container" style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px' }}>
                        <p style={{ color: 'white', fontSize: '14px', marginBottom: '10px' }}>🎉 Seu presente está pronto!</p>
                        <input
                            readOnly
                            value={linkGerado}
                            style={{ width: '100%', padding: '8px', textAlign: 'center', borderRadius: '5px', border: 'none' }}
                        />
                        <button
                            onClick={() => window.open(linkGerado, '_blank')}
                            className="btn-principal"
                            style={{ backgroundColor: '#28a745', marginTop: '10px' }}
                        >
                            Abrir Presente 🚀
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CriarDeclaracao;