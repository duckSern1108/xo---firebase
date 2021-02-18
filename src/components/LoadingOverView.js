import React from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingOverView({style}) {
    return(
        <Backdrop open={true} style={{background : "white",...style}}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
