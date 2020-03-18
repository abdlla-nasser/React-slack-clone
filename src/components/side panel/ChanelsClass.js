import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase'

export class ChannelsClass extends Component {
    state = {
        channels: [],
        modal: false,
        channelName: "",
        channelDetails: "",
        channelsRef: firebase.database().ref('channels')
    }
    componentDidMount() {
        this.addListeners()
    }

    addListeners = () => {
        const { channelsRef } = this.state;
        let loadedChannels = []
        channelsRef.on("child_added", snap => {
            loadedChannels.push(snap.val())
            console.log(loadedChannels)
            this.setState({ channels: loadedChannels })
        })
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        })
    }
    isFormValid =( channelName, channelDetails ) => channelName && channelDetails
    addChannel = () => {
        const { channelsRef, channelDetails, channelName } = this.state; 
        const { displayName, uid } = this.props.currentUser;
        const key = channelsRef.push().key;
        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: displayName,
                id: uid
            }
        }
        channelsRef.child(key).update(newChannel).then(() => this.setState({channelName: "", channelDetails: ""}))
    }
    handleSubmit = e => {
        const { channelName, channelDetails } = this.state 
        e.preventDefault();
        if(this.isFormValid(channelName, channelDetails)){
            this.addChannel();
        }
    }

    render(){
        const { channels, modal } = this.state
        return (
            <React.Fragment>
            <Menu.Menu style={{ paddingBottom: "2em" }}>
                <Menu.Item>
                    <span>
                        <Icon name="exchange" /> Channels
                    </span> {channels.length} <Icon name="add" onClick={() => this.setState({...this.state, modal: true}) }/>
                </Menu.Item>
                {/* channels */}
                {channels.length > 0 && channels.map(channel =>  {
                    return (
                        <Menu.Item 
                            key={channel.id} 
                            onClick={() => console.log("channel selected")}
                            name={channel.name} 
                            style={{ opacity: 0.7 }} >
                            # { channel.name }
                        </Menu.Item>
                    )
                })}
            </Menu.Menu>
            <Modal basic open={modal} onClose={() =>  this.setState({...this.state, modal: false})}>
                <Modal.Header>Add a channel</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Input fluid label="Name of channel" name="channelName" onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <Input fluid label="about channel" name="channelDetails" onChange={this.handleChange} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" inverted onClick={this.handleSubmit}>
                        <Icon name="checkmark" /> Add
                    </Button>
                    <Button color="red" inverted onClick={() => this.setState({...this.state, modal: false})}>
                        <Icon name="remove" /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </React.Fragment>
        )
    }
}