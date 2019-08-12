import React, {
    Component
} from 'react';
import './login.css'
// import { Container } from './styles';
import {
    URL_BACKEND
} from '../../config'
import { Link } from 'react-router-dom'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePass = this.handlePass.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.state = {
            email: '',
            pass: '',
            register: false
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
                    console.log("Token guardado na local Storage");
                } else {
                    alert(response.message);
                }

            })
            .catch(err => {
                this.this.setState({
                    register: true
                })
            })

        console.log(JSON.stringify(data));
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


    render() {
        return (
            <div className="Login" onSubmit={this.handleSubmit}>
                <form action="/login" method="POST">
                    <h1> Formulario </h1>
                    <input type="text" placeholder="Email" onChange={this.handleEmail} />
                    <input type="password" placeholder="Senha" onChange={this.handlePass} />
                    <button type="submit" onClick={this.handleButton}> Enviar </button>
                </form>
                <div className="buttons">
                    <Link to="/forgotPassword">Esqueceu a senha?</Link>
                    <Link to="/register">Registrar</Link>
                </div>
            </div>
        )
    }
}