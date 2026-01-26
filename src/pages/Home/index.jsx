import { useRef } from 'react'
import './style.css'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

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

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName} />
        <input placeholder="Idade" name='idade' type='number' ref={inputAge} />
        <input placeholder="E-mail" name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
        <button type='button' onClick={() => navigate('/')}>Sair / Voltar ao Login</button>
      </form>
    </div>
  )
}

export default Home