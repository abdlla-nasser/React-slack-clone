import React, { useState, useEffect } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase'

import { useDispatch, useSelector } from 'react-redux';

import { setChannel } from '../../actions'

export const Channels = ({ currentUser }) => {
    const dispatch = useDispatch();
    const { channel } = useSelector(state => ({
        ...state.channelReducer
    }))
    const [ channels, setChannels ] = useState([])
    const [ modal, setModal ] = useState(false)
    const [ form, setForm ] = useState({})

    const channelsRef = firebase.database().ref('channels')
    
    useEffect(() => {
        addListeners()
        return removeListeners
    }, [])

    useEffect(() => {
        if(channels.length !== 0){
            dispatch(setChannel(channels[0]))
        }
    }, [channels])

    const removeListeners = () => {
        channelsRef.off()
    }

    const addListeners = () => {
        channelsRef.on("child_added", snap => {
            setChannels(channels => [...channels, snap.val()])
        })
    }

    const addChannel = () => {
        const key = channelsRef.push().key;
        const newChannel = {
            id: key,
            name: form.channelName,
            details: form.channelDetails,
            createdBy: {
                name: currentUser.displayName,
                id: currentUser.uid
            }
        }
        channelsRef.child(key).update(newChannel).then(() => setForm({channelName: "", channelDetails: ""}))
    }
    const isFormValid = ({ channelName, channelDetails}) => channelName && channelDetails
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(isFormValid(form)){
            addChannel(e);
            console.log("channel added")
            setModal(false)
        }
    }
    return (
        <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
            <Menu.Item>
                <span>
                    <Icon name="exchange" /> Channels
                </span> {channels.length} <Icon name="add" onClick={() => setModal(true)}/>
            </Menu.Item>
            {/* channels */}
            {channels.length > 0 && channels.map(item =>  {
                return (
                    <Menu.Item 
                        key={item.id} 
                        onClick={() => dispatch(setChannel(item))}
                        name={item.name} 
                        style={{ opacity: 0.7 }}
                        active={
                            !channel ? null : (item.id === channel.id)
                            }>
                        # { item.name }
                    </Menu.Item>
                )
            })}
        </Menu.Menu>
        <Modal basic open={modal} onClose={() =>  setModal(false)}>
            <Modal.Header>Add a channel</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <Input fluid label="Name of channel" name="channelName" onChange={handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <Input fluid label="about channel" name="channelDetails" onChange={handleChange} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="green" inverted onClick={handleSubmit}>
                    <Icon name="checkmark" /> Add
                </Button>
                <Button color="red" inverted onClick={() => setModal(false)}>
                    <Icon name="remove" /> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
        </React.Fragment>
    )
}