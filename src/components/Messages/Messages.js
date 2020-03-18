import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';
import { useSelector } from 'react-redux';
import { Segment, Comment} from 'semantic-ui-react'
import { MessagesHeader } from './MessagesHeader'
import { MessagesForm } from './MessagesForm'
import { Message } from './Message'

export const Messages = () => {
    const { channel, currentUser } = useSelector(state => ({
        ...state.channelReducer,
        ...state.userReducer
    }))
    const [messages, setMessages] = useState([])
    const messagesRef = firebase.database().ref("messages")
    useEffect(() => {
        if(channel && currentUser) {
            setMessages([])
            addListeners(channel.id)
        }
        return removeListeners
    }, [channel])
    const removeListeners = () => {
        messagesRef.off()
    }
    const addListeners = channelId => {
        addMessagesListener(channelId)
    }
    const addMessagesListener = channelId => {
        messagesRef.child(channelId).on("child_added", snap => {
            setMessages(messages => [...messages, snap.val()])
        })
    }
    return (
        <React.Fragment>
        <MessagesHeader />
        <Segment>
            <Comment.Group className="messages">
                {messages.length > 0 && messages.map(message => (
                    <Message key={message.timestamp} message={message} user={currentUser} />
                ))}
            </Comment.Group>
        </Segment>
        <MessagesForm messagesRef={messagesRef} channel={channel} currentUser={currentUser}/>
        </React.Fragment>
    )
}