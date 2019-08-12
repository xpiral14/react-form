import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import './register.css'

// import { Container } from './styles';
import { URL_BACKEND } from '../../config'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    let user = { userData: { name, email, pass: password } }
    console.log(JSON.stringify(user));

    fetch(`${URL_BACKEND}/users/register`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          alert("Cadastrado com sucesso!")
        } else {
          alert(response.message);
        }

      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <div className="register">
      <form action="/register" method="POST" onSubmit={handleSubmit}>
        <h1>Registrar-se</h1>
        <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Registrar</button>
      </form>
      <div className="buttons">
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}
