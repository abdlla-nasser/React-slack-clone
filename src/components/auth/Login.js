import React, { useState } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
// import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import { useInput } from '../hooks';
// import { isFormValid } from '../../logic/form'

export const Login = ({ history }) => {
    const email = useInput('');
    const password = useInput('');
    const [ errors, setErrors ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const isFormValid = (email, password) => email && password;
    const displayErrors = errors => {
        return errors.map((err, i) => {
            return <span key={i}>{err.message}</span>
        })
    }
    const handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? "error" : ""
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(isFormValid(email.value, password.value)){
            setErrors([])
            setLoading(true) 
            firebase.auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(signedInUser => {
                console.log(signedInUser)
            })
            .catch(err => {
                setErrors([...errors.concat(err)])
                setLoading(false)
            })
        }           
    }
    return (
        <Grid textAlign='center' verticalAlign='middle' className='app'>
            <Grid.Column style={{maxWidth: 450}} >
                <Header as='h1' icon color='violet' textAlign='center'>
                    <Icon name='code branch' color='violet' />
                    login to DevChat
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input {...email} fluid 
                        name='email' icon='mail' IconPosition='left' 
                        placeholder='Email' type='email'
                        className={handleInputError(errors, "email")}
                        />
                        <Form.Input {...password} fluid 
                        name='password' icon='lock' IconPosition='left' 
                        placeholder='Password' type='password'
                        className={handleInputError(errors, "password")}
                        />
                        <Button disabled={loading} className={loading ? 'loading' : ""} color='violet' fluid size='large'>Submit</Button>
                    </Segment>
                </Form>
                {
                errors.length > 0 && (
                    <Message error>
                        <h3>Error</h3>
                        <p>{displayErrors(errors)}</p>
                    </Message>
                )}
                <Message>Don't have an account ? <a onClick={() => history.push("/register")}>Register</a></Message>
            </Grid.Column>
        </Grid>
    )
}