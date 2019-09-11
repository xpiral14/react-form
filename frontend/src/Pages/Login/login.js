import React, {
    Component
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
export default class Login extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePass = this.handlePass.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.isLogged = this.isLogged.bind(this)
        this.state = {
            email: '',
            pass: '',
            logged: false,
            totalUser: 0
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        let data = {
            userData: {
                email: this.state.email,
                pass: this.state.pass
            }
        }
        fetch(`${URL_BACKEND}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    localStorage.setItem('token_login', response.token)
                    this.setState({
                        email: '',
                        pass: ''
                    })
                    let token = localStorage.getItem('token_login')
                    this.setState({ logged: true })
                    fetch(`${URL_BACKEND}/users`, {
                        method: 'GET',
                        headers: {
                            'authorization': 'bearer ' + token
                        }
                    })
                        .then(response => response.json())
                        .then(response => {
                            this.setState({
                                totalUser: response.length
                            })
                            document.title = `React-Form: Total de usuários: ${this.state.totalUser}`

                        })
                        .catch(err => console.log(err))

                } else {
                    alert(response.message);
                }

            })
            .catch(err => {
                this.this.setState({
                    register: true
                })
            })
    }
    handleEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    handlePass(e) {
        this.setState({
            pass: e.target.value
        })
    }
    isLogged(){
        return this.state.logged ? <h4>Logado com sucesso!</h4> : ''
        
    }

    render() {
        return (
            <>
            {this.state.logged ? <Users /> : ''}
        <div className="Login" onSubmit={this.handleSubmit}>
            <form action="/login" method="POST">
                {this.isLogged()}
                <h1> Formulario </h1>
                <input type="text" placeholder="Email" onChange={this.handleEmail} />
                <input type="password" placeholder="Senha" onChange={this.handlePass} />
                <button type="submit" onClick={this.handleButton}> Enviar </button>
            </form>
            <div className="buttons" >

                < Link to="/register" > Registrar </Link>
            </div>
        </div>
        </>
        )
    }
}