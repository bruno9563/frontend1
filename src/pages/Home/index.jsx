import { useRef, useState } from 'react'
import './style.css'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  // Estados para o chat de suporte
  const [showSupport, setShowSupport] = useState(false)
  const supportInputRef = useRef()

  async function createUsers() {
    // --- SUGESTÃO 1: VALIDAÇÃO ---
    const name = inputName.current.value
    const age = inputAge.current.value
    const email = inputEmail.current.value

    if (!name || !age || !email) {
      alert("Por favor, preencha todos os campos antes de cadastrar!")
      return // Para a execução aqui se faltar algo
    }

    try {
      await api.post('/usuarios', {
        name,
        age: parseInt(age),
        email
      })

      // --- SUGESTÃO 2: FEEDBACK VISUAL ---
      alert("Usuário cadastrado com sucesso! ✅")

      // Limpa os campos após sucesso
      inputName.current.value = ""
      inputAge.current.value = ""
      inputEmail.current.value = ""

    } catch (error) {
      // alert("Erro ao cadastrar usuário. Verifique se o e-mail já existe.")
      console.error(error)
      alert("Erro ao cadastrar usuário: " + (error.response?.data?.message || error.message))
    }
  }

  function handleSupportSubmit() {
    const message = supportInputRef.current.value
    if (!message) {
      alert("Por favor, digite uma mensagem.")
      return
    }

    // Abre o cliente de e-mail padrão com a mensagem
    const subject = encodeURIComponent("Suporte - Cadastro de Usuários")
    const body = encodeURIComponent(message)
    window.location.href = `mailto:brunosilvasouza860@gmail.com?subject=${subject}&body=${body}`

    // Feedback visual e fechar a caixa
    supportInputRef.current.value = ""
    setShowSupport(false)
  }

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName} autoComplete="name" />
        <input placeholder="Idade" name='idade' type='number' ref={inputAge} autoComplete="off" />
        <input placeholder="E-mail" name='email' type='email' ref={inputEmail} autoComplete="email" />
        <button type='button' onClick={createUsers}>Cadastrar</button>
        <button type='button' onClick={() => navigate('/')}>Sair / Voltar ao Login</button>
      </form>

      {/* Botão de Suporte Flutuante */}
      <button
        className="support-button"
        onClick={() => setShowSupport(!showSupport)}
        title="Abrir Suporte"
      >
        {showSupport ? "X" : "Suporte"}
      </button>

      {/* Caixa de Chat do Suporte */}
      {showSupport && (
        <div className="support-box">
          <h3>Fale com o Suporte</h3>
          <textarea
            ref={supportInputRef}
            placeholder="Digite sua mensagem aqui..."
          />
          <button onClick={handleSupportSubmit}>Enviar</button>
        </div>
      )}
    </div>
  )
}

export default Home