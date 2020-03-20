import React from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions'


export const UserPanel = () => {
    const { currentUser } = useSelector(state => ({
        ...state.userReducer
    }))
    const dispatch = useDispatch()
    const handleSignOut = () => {
        console.log("signing out")
        firebase.auth().signOut().then(() => {
            console.log("Signed Out")
            dispatch(setUser(null))
        })
    }
    const dropdownOptions = () => [
        {
            key: 'user',
        text: <span>Signed in as <strong>{currentUser ? currentUser.displayName : null}</strong></span>,
            disabled: true
        },
        {
            key: 'Avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'Sing Out',
            text: <span>Sign Out</span>,
            onClick: handleSignOut
        }
    ]
    return (
        <Grid style={{ background: "#4c3c4c" , marginRight: 0}}>
            <Grid.Column>
                <Grid.Row style={{ padding: "1.2em", margin: 0}}>
                    <Header inverted floated="left" as="h2">
                        <Icon name="code" />
                        <Header.Content>DevChat</Header.Content>
                    </Header>
                    <Header style={{ padding: '0.25em'}} as="h4" inverted>
                        <Dropdown trigger={
                            <span>
                                <Image avatar src={currentUser ? currentUser.photoURL : null} />
                                {currentUser ? currentUser.displayName : null}
                            </span>
                        } options={dropdownOptions()} />
                    </Header>
                </Grid.Row>
            </Grid.Column>
        </Grid> 
    )
}