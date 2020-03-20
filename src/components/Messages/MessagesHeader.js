import React from 'react';
import { Header, Segment, Input, Icon} from 'semantic-ui-react'

export const MessagesHeader = ({ users, handleSearchInputChange, channel, isPrivate, searchLoading }) => {
    // instead of using useSelector to get channel i just get it from messages component
    return (
        <Segment clearing className="messages__header">
            <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0  , marginTop: 0}}>
                <span>
                {channel ? channel.name : "channel"}
                <Icon name={"star outline"} color="black" />
                </span>
                <Header.Subheader>{ channel && isPrivate ? null : users.length > 1 ? `${users.length} users`: `1 user`}</Header.Subheader>
            </Header>
            <Header floated="right">
                <Input size='large' icon="search" name='searchTerm' placeholder="search Messages" onChange={handleSearchInputChange} loading={searchLoading}/>
            </Header>
        </Segment>
    )
} 