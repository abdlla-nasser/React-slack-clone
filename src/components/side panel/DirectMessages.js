import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'semantic-ui-react'
import firebase from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setChannel } from '../../actions'

export const DirectMessages = ({ currentUser }) => {
    const dispatch = useDispatch()
    const { channel } = useSelector(state => ({
        ...state.channelReducer
    }))
    const [users, setUsers] = useState([])
    const [updatedUsers, setUpdatedUsers] = useState([])
    const usersRef = firebase.database().ref("users")
    const connectedRef = firebase.database().ref('.info/connected')
    const presenceRef = firebase.database().ref("presence")
    useEffect(() => {
        if(currentUser !== null){
            addListeners(currentUser.uid)
        }
    }, [currentUser])
    const addListeners = (userId) => {
        usersRef.on("child_added", snap => {
            if(userId !== snap.key){
                let user = snap.val();
                user.uid = snap.key;
                user.status = 'offline'
                setUsers(users => [...users, user])
            }
        })
        connectedRef.on("value", snap => {
            if(snap.val() === true){
                const ref = presenceRef.child(userId)
                ref.set(true);
                ref.onDisconnect().remove(err => {
                    if(err !== null){
                        console.error(err)
                    }
                })
            }
        })
    }
    useEffect(() => {
        if(currentUser !== null){
            addPresenceListener(currentUser.uid)
        }
    }, [users])
    const addPresenceListener = userId =>{
        presenceRef.on("child_added", snap => {
            if(userId !== snap.key){
                addStatusToUser(snap.key)
            }
        })
        presenceRef.on("child_removed", snap => {
            if(userId !== snap.key){
                addStatusToUser(snap.key, false)
            }
        })
    }
    const addStatusToUser = (userId, connected = true) => {
        const userToUpdate = users.find(user => user.uid === userId)
        const offline = users.filter(user => user.uid !== userId)
        if(userToUpdate){
            console.log(userToUpdate)
            userToUpdate.status = connected ? "online" : "offline"
            setUpdatedUsers([userToUpdate,...offline])
        } else {
            setUpdatedUsers(updatedUsers => [...updatedUsers, ...offline])
        }
    }
    return(
        <Menu.Menu className="menu">
            <Menu.Item>
                <span><Icon name="mail"/>Direct Messages</span>{' '}
                ({ users.length })
            </Menu.Item>
            {
                updatedUsers.length > 0 && updatedUsers.map(user => {
                    console.log(user.uid)
                    console.log(channel.id)
                    return (
                        <Menu.Item key={user.uid} onClick={() => dispatch(setChannel(user, currentUser, true))} style={{opacity: 0.7}}
                            active={!channel ? null : channel.id.includes(user.uid)}>
                            <Icon name="circle" color={user.status === 'online' ? "green" : user.status === 'offline' ? "red" : null}/>
                            {user.name}
                        </Menu.Item>
                    )
                })
            }
        </Menu.Menu>
    )
}