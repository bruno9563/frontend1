import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

function Presente() {
  const { id } = useParams();
  const [dados, setDados] = useState(null);
  const [tempo, setTempo] = useState("");

  // 🔹 Carregar dados do PRESENTE pela ID do presente
  useEffect(() => {
    async function carregarPresente() {
      if (!id) return;

      try {
        const response = await api.get(`/gifts/${id}`);
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar presente:", error);
        alert("Presente não encontrado ou link inválido.");
      }
    }

    carregarPresente();
  }, [id]);

  // 🔹 Contador de tempo
  useEffect(() => {
    if (!dados?.dataInicio) return;

    const interval = setInterval(() => {
      const inicio = new Date(dados.dataInicio);
      const agora = new Date();
      const diff = agora - inicio;

      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diff / 1000 / 60) % 60);
      const segundos = Math.floor((diff / 1000) % 60);

      setTempo(`${dias}d ${horas}h ${minutos}m ${segundos}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [dados]);

  if (!dados) {
    return <div className="loading">Carregando nossa história... ❤️</div>;
  }

  return (
    <div className="container-geral">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="coracao-flutuante"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * (30 - 15) + 15}px`
          }}
        >
          ❤️
        </div>
      ))}

      <div className="presente-box">
        <h1 className="titulo">Para meu amor ❤️</h1>

        <p className="subtitulo">Estamos juntos há:</p>
        <div className="contador">{tempo}</div>

        <div className="mensagem-card">
          <p>
            "{dados.mensagem || "Eu te amo muito!"}"
          </p>
        </div>
      </div>
    </div>
  );
}

export default Presente;
