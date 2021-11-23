import React from 'react'
import { Link } from 'react-router-dom'
import { filterInput } from '../utils/helpers'
import { Figure, Form, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import {AuthContext} from "../../Context/auth-context"


class SignUp extends React.Component {
    static contextType = AuthContext;
    state = {
        disabled: false,
        error: null
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        if (this.state.disabled)
            return
        this.setState({ error: null, disabled: true })
        try {
            let form = e.target
            let uid = filterInput(form.username.value, 'username', { min_length: 4 })
            let password = filterInput(form.password.value, 'password')
            let name = filterInput(form.fullname.value, 'name', { min_length: 0 })
                       console.log(uid, password, name);

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid,
                    password,
                    name
                })
            })
            // console.log("response: ", response);

            if (!response.ok) {
                if (response.status === 409) 
                    throw Error((await response.json()).message)
                throw Error('Something went wrong')
            }
            let data = await response.json();
            console.log("data: ", data);
            this.setState({ disabled: false })
            this.context.login(data.uid, data.token)
        } catch (error) {
            console.log(error.message)
            this.setState({ error: error.message, disabled: false })
        }

    }
    render() {
        let disabled = this.state.disabled
        return (
            <Col style={{ maxWidth: "400px", padding:"2rem"  }} className="mx-auto border px-3 pb-3">
                <Figure style={{color: "#1DA1F2"}}>
                <FontAwesomeIcon className="m-2" size="3x" icon={faTwitter} />
                </Figure>
                <h1 style = {{fontWeight:"700", padding:"1rem"}} className="font-weight-bolder">
                    Happening now
                </h1>
                <h5 style = {{paddingBottom:"0.5rem"}} className="font-weight-bolder">
                    Join twitter today.
                </h5>
                <fieldset disabled={disabled}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Choose a username - <small className="text-muted">required</small></Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                autoCapitalize="off"
                                autoComplete="off"
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="fillname">
                            <Form.Label>Full name - <small className="text-muted">optional</small></Form.Label>
                            <Form.Control
                                type="text"
                                name="fullname"
                                autoCapitalize="on"
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Choose a password - <small className="text-muted">required</small></Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                            ></Form.Control>
                        </Form.Group>
                        <p className="mt-n2">
                            <small>Already have account? <Link to="/login">login instead</Link></small>
                            <br />
                            <small className="text-danger">{this.state.error}</small>
                        </p>
                        <div className="d-flex flex-column align-items-center">
                            <button
                                type="submit"
                                className="btn btn-outline-primary font-weight-bold rounded-pill btn-block">
                                <span>Sign up</span>
                            </button>
                            <div className="seperator"><span>or</span></div>
                            <Link
                                to="/login"
                                className="btn btn-primary font-weight-bold rounded-pill btn-block">
                                <span>Log in</span>
                            </Link>
                        </div>
                    </Form>
                </fieldset>
            </Col>
        )
    }
}
export default SignUp;