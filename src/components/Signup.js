import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
});

class Signup extends React.Component {
    state = {
        dialogOpen: false,
    };

    handleDialog = () => {
        this.setState(prevState => ({ dialogOpen: !prevState.dialogOpen }))
    }

    render() {
        return(
            <>
                <Button color="inherit" onClick={this.handleDialog}>
                    Sign Up
                </Button>

                <Dialog open={this.state.dialogOpen} onClose={this.handleDialog}>
                    <DialogTitle>Sign Up</DialogTitle>
                    <DialogContent>
                        <TextField label="Username" placeholder="Username" margin="dense" /><br />
                        <TextField label="Email" placeholder="Email" margin="dense" /><br />
                        <TextField type="password" label="Password" placeholder="Password" margin="dense" /><br />
                        <TextField type="password" label="Confirm password" placeholder="Confirm password" margin="dense" />
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary">SIGN UP</Button>
                    </DialogActions>

                </Dialog>

            </>
        )
    }
}

export default withStyles(styles)(Signup);

// export default class FormDialog extends React.Component {
//     state = {
//         open: false,
//     };

//     handleClickOpen = () => {
//         this.setState({ open: true });
//     };

//     handleClose = () => {
//         this.setState({ open: false });
//     };

//     render() {
//         return (
//             <div>
//                 <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
//                     Open form dialog
//                 </Button>
//                 <Dialog
//                     open={this.state.open}
//                     onClose={this.handleClose}
//                     aria-labelledby="form-dialog-title"
//                 >
//                     <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
//                     <DialogContent>
//                         <DialogContentText>
//                             To subscribe to this website, please enter your email address here. We will send
//                             updates occasionally.
//             </DialogContentText>
//                         <TextField
//                             autoFocus
//                             margin="dense"
//                             id="name"
//                             label="Email Address"
//                             type="email"
//                             fullWidth
//                         />
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={this.handleClose} color="primary">
//                             Cancel
//             </Button>
//                         <Button onClick={this.handleClose} color="primary">
//                             Subscribe
//             </Button>
//                     </DialogActions>
//                 </Dialog>
//             </div>
//         );
//     }
// }