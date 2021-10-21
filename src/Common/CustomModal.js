import React from 'react';
import { makeStyles } from '@mui/styles';
import { Dialog, Backdrop, Fade } from '@mui/material';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    paper: {
        backgroundColor: 'theme.palette.background.paper',
        boxShadow: 'theme.shadows[5]',
        padding: 'theme.spacing(2, 4, 3)',

    },
}));

export default function CustomModal(props) {
    const classes = useStyles();
    const {
        children,
        open = false,
        maxWidth = 'md'
    } = props;

    return (
        <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={clsx(classes.modal, 'cus-popup')}
            open={open}
            classes={{ paper: `custom-modal` }}
            closeAfterTransition={true}
            BackdropComponent={Backdrop}
            maxWidth={maxWidth}
            BackdropProps={{
                timeout: 500
            }}
        >

            <Fade in={open}>
                <div className={classes.paper}>
                    {children}
                </div>

            </Fade>
        </Dialog>
    );
}