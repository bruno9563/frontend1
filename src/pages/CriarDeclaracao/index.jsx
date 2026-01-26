import { useState, useRef } from 'react';
import api from '../../services/api';
import './style.css';

function CriarDeclaracao() {
    const textoRef = useRef();
    const dataRef = useRef();
    const [linkGerado, setLinkGerado] = useState('');
    const [carregando, setCarregando] = useState(false);

    async function handleSalvar() {
        setCarregando(true);
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            alert("Erro: Usuário não identificado. Faça login novamente.");
            setCarregando(false);
            return;
        }

        const payload = {
            mensagem: textoRef.current.value,
            dataInicio: dataRef.current.value,
            // Enviamos fotoUrl como null ou vazio para limpar o que tinha antes
            fotoUrl: [] 
        };

        try {
            await api.patch(`/usuarios/${userId}/declaracao`, payload);

            // Gera o link usando a URL atual do navegador
            const urlFinal = `${window.location.origin}/presente/${userId}`;
            setLinkGerado(urlFinal);

            alert("Sua declaração foi salva com sucesso! ❤️");
        } catch (err) {
            console.error(err);
            alert("Erro ao conectar com o servidor.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="container-geral">
            <div className="login-box">
                <h1>Sua Declaração</h1>

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

                <button 
                    className="btn-principal" 
                    onClick={handleSalvar} 
                    disabled={carregando}
                    style={{ marginTop: '20px' }}
                >
                    {carregando ? "Salvando..." : "Gerar Link do Presente"}
                </button>

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