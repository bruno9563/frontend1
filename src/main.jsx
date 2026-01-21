import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import './index.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Presente from './pages/Presente';
// 1. Importe a nova página aqui (supondo que a pasta chama CriarDeclaracao)
import CriarDeclaracao from './pages/CriarDeclaracao' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Home />} />
        {/* 2. Adicione a rota para a criação da declaração */}
        <Route path="/criar" element={<CriarDeclaracao />} />
        <Route path="/presente/:id" element={<Presente />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)