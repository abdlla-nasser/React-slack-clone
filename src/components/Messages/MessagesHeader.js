import React from 'react';
import { Header, Segment, Input, Icon} from 'semantic-ui-react'
import { useSelector } from 'react-redux';



export const MessagesHeader = () => {
    const { channel } = useSelector(state => ({
        ...state.channelReducer
    }))
    return (
        <Segment clearing>
            <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
                <span>
                {channel ? channel.name : "channel"}
                <Icon name={"star outline"} color="black" />
                </span>
                <Header.Subheader>2 user</Header.Subheader>
            </Header>
            <Header floated="right">
                <Input size="mini" icon="search" name='searchTerm' placeholder="search Messages"/>
            </Header>
        </Segment>
    )
} 