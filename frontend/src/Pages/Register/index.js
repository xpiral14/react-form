import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import './register.css'

// import { Container } from './styles';
import { URL_BACKEND } from '../../config'

export default function Register() {
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [success, setSuccess] = useState(false)
  let [logged, setLogged] = useState(false)
  let [totalUser, setTotalUsers] = useState(0)

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
          setSuccess(true)
          console.log(response.data);
        } else {
          alert(response);
          console.log(response.pass);
        }

      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <div className="register">
      <form action="/register" method="POST" onSubmit={handleSubmit}>
        {success ? <h3> Registrado com sucesso</h3> : ''}
        <h1>Registrar-se</h1>
        <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Registrar</button>
      </form>
      <div className="buttons">
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}
