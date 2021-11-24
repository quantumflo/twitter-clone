import React from 'react'
import { Link } from 'react-router-dom'
import { filterInput } from '../utils/helpers'
import { Figure, Form, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import {AuthContext} from "../../Context/auth-context"

class Login extends React.Component {
    static contextType = AuthContext;
    state = {
        disabled: false,
        error: null,
        password: '',
        username: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        console.log(process.env.NODE_ENV)

        e.preventDefault()
        if (this.state.disabled)
            return
        this.setState({ error: null, disabled: true })
        try {
            let form = e.target
            let uid = filterInput(form.username.value, 'username', { min_length: 4 })
            let password = filterInput(form.password.value, 'password')
            let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/login", {
                method: 'POST',
                body: JSON.stringify({
                    uid,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status >= 500) {
                throw Error('Something went wrong.')
            }
            else if (response.status >= 400) {
                throw Error('Incorrect credentials')
            }
            else if (response.ok) {
                let data = await response.json()
                console.log(data)
                this.setState({ disabled: false })
                this.context.login(data.uid, data.token)
            }
        } catch (error) {
            console.log(error.message)
            this.setState({ error: error.message, disabled: false })
        }
   }
    render() {
        let disabled = this.state.disabled
        return (
            <Col style={{ maxWidth: "400px", padding:"2rem" }} className="mx-auto border px-3 pb-3">
                
                    <Figure  style={{color: "#1DA1F2"}}  >
                    <FontAwesomeIcon className="m-2" size="3x" icon={faTwitter} />
                    </Figure>
                
                <h3 className="font-weight-bolder mt-3">
                    Sign in to Twitter
                </h3>
                <fieldset disabled={disabled}>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                onChange={this.handleChange}
                                value={this.state.username}
                                type="text"
                                name="username"
                                autoCapitalize="off"
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-0" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={this.handleChange}
                                value={this.state.password}
                                autoCorrect="off"
                                type="password"
                                name="password"
                            ></Form.Control>
                        </Form.Group>
                        <p>
                            <small className="text-danger">{this.state.error}</small>
                        </p>
                        <div className="d-flex flex-column align-items-center">
                            <button type="submit" className="btn btn-outline-primary btn-block rounded-pill font-weight-bold">
                                Log in
                            </button>
                            <small className="text-muted m-2">or</small>
                            <Link
                                to="/signup"
                                className="btn btn-primary btn-block rounded-pill font-weight-bold"
                            >
                                Sign up
                            </Link>
                        </div>
                    </Form>
                </fieldset>
            </Col>
        )
    }
}
export default Login;