import React from 'react';
import { Progress } from 'semantic-ui-react'

export const ProgressBar = ({percentUploaded, uploadState}) => {
    return (
        <Progress indicating size="large" inverted progress className="progress__bar" percent={percentUploaded}>
            {uploadState}
            {` ${percentUploaded} %`}
        </Progress>
    )
}