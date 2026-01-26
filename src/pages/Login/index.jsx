import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import api from '../../services/api';
import './style.css';

function Login() {
  const navigate = useNavigate();

  const inputName = useRef();
  const inputEmail = useRef();

  async function handleLogin() {
    const nomeDigitado = inputName.current.value.trim();
    const emailDigitado = inputEmail.current.value.trim();

    if (!nomeDigitado || !emailDigitado) {
      alert("Por favor, preencha o Nome e o E-mail.");
      return;
    }

    try {
      const response = await api.get('/usuarios');
      const usuarios = response.data;

      const usuarioValido = usuarios.find(user => {
        const dbNome = user.nome || user.name;
        const dbEmail = user.email;

        return (
          dbNome?.toLowerCase() === nomeDigitado.toLowerCase() &&
          dbEmail?.toLowerCase() === emailDigitado.toLowerCase()
        );
      });

      if (usuarioValido) {
        localStorage.setItem('userId', usuarioValido.id); // Use usuarioValido, que é o nome que você definiu no .find
        alert(`Bem-vindo, ${nomeDigitado}! ✅`);
        navigate('/criar');
      }
      else {
        alert("Falha no login: Nome ou E-mail incorretos. ❌");
      }
    } catch (error) {
      console.error("Erro na API:", error);
      alert("Erro ao conectar com o servidor. Verifique o terminal do VS Code.");
    }
  }

  return (
    <div className="container-login">
      <div className="login-box">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Digite seu Nome"
          ref={inputName}
        />
        <input
          type="email"
          placeholder="Digite seu E-mail"
          ref={inputEmail}
        />
        <button onClick={handleLogin}>Entrar</button>

        <p>Ainda não tem cadastro?</p>
        <button className="btn-secondary" onClick={() => navigate('/cadastro')}>
          Criar conta agora
        </button>
      </div>
    </div>
  );
}

export default Login;