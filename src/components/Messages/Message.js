import React from 'react';
import { Comment, Image } from 'semantic-ui-react'
import moment from 'moment'

export const Message = ({ message, user }) => {
    const isImage = (message) => {
        return message.hasOwnProperty("image") && !message.hasOwnProperty("content")
    }
    return (
    <Comment>
        <Comment.Avatar src={message.user.avatar} />
        <Comment.Content className={user && message && message.user.id === user.uid ? "message__self" : "" } >
            <Comment.Author as="a">{message.user.name}</Comment.Author>
            <Comment.Metadata>{moment(message.timestamp).fromNow()}</Comment.Metadata>
            {isImage(message) ?
            <Image src={message.image} className="message__image" /> :
            <Comment.Text>{message.content}</Comment.Text>
            }
        </Comment.Content>
    </Comment>
    )
}