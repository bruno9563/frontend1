import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import api from '../../services/api';
import './style.css';

function Login() {
  const navigate = useNavigate();

  const inputName = useRef();
  const inputEmail = useRef();

  // Removido o redirecionamento automático para permitir que o usuário
  // sempre veja a tela de login ao acessar a rota raiz (/)
  // Se quiser ir direto para criar, use o botão "Criar Presente" na navbar

  async function handleLogin(e) {
    if (e) e.preventDefault(); // Evita recarrgar a página se vier do form

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
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <input
            id="username"
            type="text"
            name="username"
            autoComplete="username"
            placeholder="Digite seu Nome"
            ref={inputName}
          />
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Digite seu E-mail"
            ref={inputEmail}
          />
          <button type="submit">Entrar</button>
        </form>

        <p>Ainda não tem cadastro?</p>
        <button className="btn-secondary" onClick={() => navigate('/cadastro')}>
          Criar conta agora
        </button>
      </div>
    </div>
  );
}

export default Login;