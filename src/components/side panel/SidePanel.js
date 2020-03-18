import React from 'react';
import { Menu } from 'semantic-ui-react';
import { UserPanel } from './UserPanel'
import { Channels } from './Channels'
// import { ChannelsClass } from './ChanelsClass'

import { useSelector } from 'react-redux';

export const SidePanel = () => {
    const { currentUser } = useSelector(state => ({
        ...state.userReducer
    }))
    return (
        <Menu size="large" inverted fixed="left" vertical style={{ background: "#4c3c4c", fontSize: "1.2rem" }} >
            <UserPanel currentUser={currentUser}/>
            <Channels currentUser={currentUser}/> 
        </Menu> 
    )
}