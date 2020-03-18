import React, { useState } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import { FileModal } from  './FileModal'
import firebase from '../../firebase'

export const MessagesForm = ({ messagesRef, channel, currentUser }) => {
    const [messageInput, setMessageInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [modal, setModal] = useState(false)
    const handleChange = e => {
        setErrors([])
        setMessageInput(e.target.value)
    }
    
    const sendMessage = () => {
        if(messageInput !== ''){
            setLoading(true)
            messagesRef.child(channel.id).push()
            .set(createMessage(null))
            .then(() => {
                setLoading(false)
                setMessageInput("")
            })
            .catch(err => {
                setLoading(false)
                setErrors([...errors, err])
            })
        }
        if(messageInput === ''){
            setErrors([...errors, {message: "add a message"}])
            // setErrs([{message : "add a message"}])
        }
    }
    const createMessage = (fileURL) => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: currentUser.uid,
                name: currentUser.displayName,
                avatar: currentUser.photoURL
            }
        }
        if(fileURL !== null) {
            message.image = fileURL;
        } else {
            message.content = messageInput
        }
        return message
    }
    return(
        <React.Fragment>
            <Segment className='message__form'>
                <Input fluid name="message" value={messageInput} label={<Button icon={'add'} />} labelPosition="left" placeholder="write your message"
                style={{ marginBottom: "0.7em" }} 
                onChange={handleChange} 
                className={errors.some(error => error.message.includes("message")) ? "error" : ""}
                />
                <Button.Group icon widths="2">
                    <Button color='orange' disabled={loading} content="Add Reply" labelPosition="left" icon="edit" onClick={sendMessage}/>
                    <Button color="teal" content="upload media" labelPosition='right' icon="cloud upload" onClick={() => setModal(true)}/>
                </Button.Group>
            </Segment>
            <FileModal modal={modal} setModal={setModal} channel={channel} messagesRef={messagesRef} createMessage={createMessage}/>
        </React.Fragment>
    )
}