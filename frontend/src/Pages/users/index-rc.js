import React, { useState, useEffect } from 'react';
import './users.css'
import { URL_BACKEND } from '../../config'
// import { Container } from './styles';

export default function Users() {
  let token = localStorage.getItem('token_login')

  let [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${URL_BACKEND}/users`, {
      method: 'GET',
      headers: {
        authorization: `beaurer ${token}`
      }
    }).then(res => res.json()).then(res => {
      setUsers(res)
    }).catch(err => console.log(err))
  }, [])


  return (
    <div className="users">
      {users ? users.map(user => {
        return (
          <div key={user.id}>
            <h3>Nome: {user.name}</h3>
            <h4>Email: {user.email}</h4>
            <hr />
          </div>
        )
      }) : 'Não há usuários'}
    </div>
  );
}
