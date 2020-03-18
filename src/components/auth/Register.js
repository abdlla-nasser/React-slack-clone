import React, { useState } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import { useInput } from '../hooks';
import md5 from 'md5'
import { isFormValid } from '../../logic/form'

export const Register = () => {
    const username = useInput('')
    const email = useInput('');
    const password = useInput('');
    const passwordConfirmation = useInput('');
    const [ errors, setErrors ] = useState([])
    const [ loading, setLoading ] = useState(false)
    
    const [ userRef, setUserRef ] = useState(firebase.database().ref('users'))
    const saveUser = createdUser => {
        return userRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avater: createdUser.user.photoURL
        })
    }

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
        // I had A problem which was i gave this function the entire username object that 
        // I got from My custom hook and the the right thing was passing the object.value
        if(isFormValid(username.value, email.value, password.value, passwordConfirmation.value, setErrors)){
            setErrors([])
            setLoading(true)
            firebase.auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(createdUser => {
                createdUser.user.updateProfile({
                    displayName: username.value,
                    photoURL: `https://api.adorable.io/avatars/250/${md5(createdUser.user.email)}@adorable.png`
                })
                .then(() => {
                    saveUser(createdUser).then(() => {
                        console.log('User Saved')
                    })
                    setLoading(false)
                })
                .catch(err => {
                    setErrors([...errors.concat(err)])
                    setLoading(false)
                })
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
                <Header as='h1' icon color='orange' textAlign='center'>
                    <Icon name='puzzle piece' color='orange' />
                    Register for DevChat
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input {...username} fluid 
                        name='username' icon='user' IconPosition='left' 
                        placeholder='Username' type='text'
                        className={handleInputError(errors, "username")}
                        />
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
                        <Form.Input {...passwordConfirmation} fluid 
                        name='passwordConfirmation' icon='repeat' IconPosition='left' 
                        placeholder='Password confirmation' type='password'
                        className={handleInputError(errors, "password")}
                        />
                        <Button disabled={loading} className={loading ? 'loading' : ""} color='orange' fluid size='large'>Submit</Button>
                    </Segment>
                </Form>
                {
                errors.length > 0 && (
                    <Message error>
                        <h3>Error</h3>
                        <p>{displayErrors(errors)}</p>
                    </Message>
                )}
                <Message>Are you Already a user <Link to='/login'>login</Link></Message>
            </Grid.Column>
        </Grid>
    )
}