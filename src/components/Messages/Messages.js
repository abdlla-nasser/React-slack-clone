import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';
import { useSelector } from 'react-redux';
import { Segment, Comment} from 'semantic-ui-react'
import { MessagesHeader } from './MessagesHeader'
import { MessagesForm } from './MessagesForm'
import { Message } from './Message'

export const Messages = () => {
    const { channel, isPrivate, currentUser } = useSelector(state => ({
        ...state.channelReducer,
        ...state.userReducer
    }))
    const [messages, setMessages] = useState([])
    const [uniqueUsers, setUniqueUsers] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    let messagesRef
    if(isPrivate){
        messagesRef = firebase.database().ref("private messages")
    } else {
        messagesRef = firebase.database().ref("messages")
    }
    useEffect(() => {
        setMessages([])
        if(channel && currentUser) {
            addListeners(channel.id)
        }
        return removeListeners
    }, [channel])
    useEffect(() => {
        if(messages.length){
            const uniqueUsers = messages.reduce((acc, message) => {
                if(message.user.name){
                    if(!acc.includes(message.user.name)){
                        acc.push(message.user.name)
                    }
                }
                return acc
            }, [])
            setUniqueUsers(uniqueUsers) 
        }
    }, [messages])
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
    useEffect(() => {
        handleSearchMessages(messages)
    }, [searchLoading, searchTerm, channel, messages])
    const handleSearchInputChange = e => {
        setSearchTerm(e.target.value)
        setSearchLoading(true)
    }
    const handleSearchMessages = messages => {
        const channelMessages = [...messages]
        const regex = new RegExp(searchTerm, 'gi');
        const searchResults = channelMessages.reduce((acc, message) => {
            if(message.content && message.content.match(regex) ){
                acc.push(message)
            }
            if(message.content && message.user.name.match(regex)){
                acc.push(message)
            }
            return acc
        }, [])
        setSearchResults(searchResults)
        setTimeout(() => setSearchLoading(false), 1000)
    }
    useEffect(() => {
        if(searchTerm && !searchLoading){
            setSearchLoading(true)
        }
    }, [channel])
    const displayMessages = messages => {
        if(messages.length > 0){
            return messages.map(message => (
                    <Message key={message.timestamp} message={message} user={currentUser} />
                ))
        }
    }
    // console.log(displayMessages(messages))
    return (
        <React.Fragment>
        <MessagesHeader users={uniqueUsers} handleSearchInputChange={handleSearchInputChange} channel={channel} isPrivate={isPrivate} searchLoading={searchLoading}/>
        <Segment className="messages">
            <Comment.Group>
                { searchTerm ? displayMessages(searchResults) : messages.length > 0 ? displayMessages(messages) : null}
                {/* { displayMessages(messages) } */}
            </Comment.Group>
        </Segment>
        <MessagesForm messagesRef={messagesRef} channel={channel} currentUser={currentUser}/>
        </React.Fragment>
    )
}