import React, {
    Component, useState, useEffect
} from 'react';
import './login.css'
// import { Container } from './styles';
import {
    URL_BACKEND
} from '../../config'
import {
    Link
} from 'react-router-dom'
import Users from '../users/index-rc'

export default function Login() {
    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')
    let [logged, setLogged] = useState(false)
    let [users, setUsers] = useState([])
    let [] = useState('')

    function verifyToken() {
        let token = localStorage.getItem('token_login') || undefined
        console.log(token);
        if (token) {
            fetch(`${URL_BACKEND}/auth/verifytoken`, {
                method: 'GET',
                headers: {
                    authorization: `bearer ${token}`
                }
            }).then(response => response.json()).then(response => {
                if (response.success) {
                    setState({
                        logged: true
                    })
                    console.log(state.logged);
                } else {
                    setState({
                        logged: false
                    })
                    console.log(state.logged)
                }
            }).catch(err => console.log(err))
            return true
        } else {
            return false
        }
    function handleSubmit(e) {
        e.preventDefault()
    }
    }
    return (<>
        <div className="users">
            {typeof users === 'string' ? (
                users.map(user => {
                    return (
                        <div key={user.id}>
                            <h3>Nome: {user.name}</h3>
                            <h4>Email: {user.email}</h4>
                            <hr />
                        </div>
                    )
                })
            ) : ''}
        </div>
        <div className="Login" onSubmit={() => handleSubmit} >
            <form action="/login" method="POST" > {isLogged()} <h1> Formulario </h1>
                <input type="text" placeholder="Email" onChange={handleEmail} />
                <input type="password" placeholder="Senha" onChange={handlePass} />
                <button type="submit" onClick={handleButton}> Enviar </button>
            </form >
            <div className="buttons" >
                <Link to="/register" > Registrar </Link>
            </div>
        </div></>
    )
}