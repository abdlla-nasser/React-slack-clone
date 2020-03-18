import React, { useState, useEffect } from 'react';
import mime from 'mime-types'
import uuidv4 from 'uuid/v4';
import { Modal, Input, Button, Icon } from 'semantic-ui-react'
import firebase from '../../firebase'
import { ProgressBar } from './ProgressBar';

export const FileModal = ({ modal, setModal, channel, messagesRef, createMessage }) => {
    const [file, setFile ] = useState(null)
    const [uploadState, setUploadState] = useState("")
    const [uploadTask, setUploadTask] = useState(null)
    const [percentUploaded, setPercentUploaded] = useState(0)
    const [loading, setLoading] = useState(false)
    // ================================
    const storageRef = firebase.storage().ref()
    // ================================
    const authorized = ['image/jpeg', 'image/png']
    useEffect(() => {
        if(channel !== null){
            const pathToUpload = channel.id
            uploadTask.on("state_changed", snap => {
                setPercentUploaded(Math.round((snap.bytesTransferred / snap.totalBytes) * 100))
            }, err => {
                console.error(err)
            }, () => {
                setLoading(false)
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    sendFileMessage(downloadURL, messagesRef, pathToUpload)
                })
            }
            )
        }
    }, [uploadTask])
    const sendFileMessage = (fileURL, ref, pathToUpload) => {
        ref.child(pathToUpload).push().set(createMessage(fileURL)).then(() => {
            setUploadState("done")
            setModal(false)
            setFile(null)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const uploadFile = (file, metadata) => {
        const filePath = `chat/public/${uuidv4()}.jpg`
        setUploadState("uploading")
        setUploadTask(storageRef.child(filePath).put(file,metadata))
    }
    const sendFile = () => {
        setLoading(true)
        if(file !== null){
            if(isAuthorized(file.name)){
                const metadata = { contentType: mime.lookup(file.name)}
                uploadFile(file, metadata)
            }
        }
    }
    const addFile = e => {
        const file = e.target.files[0]
        if(file){
            setFile(file)
        }
    }
    const isAuthorized = filename => authorized.includes(mime.lookup(filename))
    return (
    <Modal basic open={modal} onClose={() => setModal(false)}>
        <Modal.Header>Select an image file</Modal.Header>
        <Modal.Content>
            <Input fluid label="file types: jpg or png" name="file" type="file" onChange={addFile}/>
        </Modal.Content>
        <Modal.Actions>
            <Button color="green" inverted onClick={sendFile}><Icon name="checkmark" />Send</Button>
            <Button color="red" inverted onClick={() => setModal(false)}><Icon name="remove"/>Cancel</Button>
        </Modal.Actions>
        {uploadState === 'uploading' ? <ProgressBar percentUploaded={percentUploaded} uploadState={uploadState}/> : null}
    </Modal>
    )
}