import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.png'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom' // Corrigido para useNavigate

function Home() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

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

      getUsers() 
    } catch (error) {
      alert("Erro ao cadastrar usuário. Verifique se o e-mail já existe.")
    }
  }

  async function deleteUsers(id) {
    // Feedback antes de deletar (opcional)
    if(confirm("Tem certeza que deseja excluir este usuário?")) {
        await api.delete(`/usuarios/${id}`)
        alert("Usuário removido! 🗑️")
        getUsers()
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

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

      {users.map((user) => (
        <div key={user.id} className="lista">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button className="trash-button" onClick={() => deleteUsers(user.id)}>
            <img src={Trash} className="trash-icon" alt="Excluir" style={{ width: '20px' }} />
          </button>
          
        </div>
      ))}
    </div>
  )
}

export default Home