import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import axios from 'axios';

class Signup extends React.Component {
    state = {
        dialogOpen: false,
        username: '',
        email: '',
        password: '',
        confirmPwd: '',
        message: '',
    };

    handleDialog = () => {
        this.setState(prevState => ({ dialogOpen: !prevState.dialogOpen }))
    }

    handleInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        axios({
            method: 'POST',
            url: 'https://quiet-anchorage-67868.herokuapp.com/api/v1/users/',
            'headers': {
                'Content-Type': 'application/json'
            },
            data: {
                username: String(this.state.username),
                email: String(this.state.email),
                password: String(this.state.password)
            }
        }).then(response => {
            console.log(response)
                if (response.data.status === "success"){
                    localStorage.setItem('JWT', response.data.auth_token)
                    this.setState({ dialogOpen: false, message: response.data.message })
                } else {
                    this.setState({ message: response.data.message })
                }
        }).catch(error => {
            console.log(error)
            this.setState({ message: "Something went wrong. Please try again."})
        })
        this.props.handleLoggedIn()
    }

    render() {
        const { email, username, password, confirmPwd } = this.state

        const emailRegex = email === "" || (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(email);
        const pwdMatch = password === confirmPwd;
        const signupEnabled = username !== '' && email !== '' && emailRegex && password !== '' && confirmPwd !== '' && pwdMatch;

        return(
            <>
                <Button color="inherit" onClick={this.handleDialog}>
                    Sign Up
                </Button>

                <Dialog open={this.state.dialogOpen} onClose={this.handleDialog}>
                    <DialogTitle>Sign Up</DialogTitle>
                    <DialogContent style={{ width: 250 }}>
                        <TextField id="username" onChange={this.handleInput}
                            label="Username" placeholder="Username" margin="dense" fullWidth /><br />
                        <TextField id="email" onChange={this.handleInput}
                            error={!emailRegex} helperText={!emailRegex ? "Please enter a valid email" : ""}
                            label="Email" placeholder="Email" margin="dense" fullWidth /><br />
                        <TextField id="password" onChange={this.handleInput}
                            type="password"
                            label="Password" placeholder="Password" margin="dense" fullWidth /><br />
                        <TextField id="confirmPwd" onChange={this.handleInput}
                            type="password" error={!pwdMatch} helperText={!pwdMatch ? "Passwords do not match" : ""}
                            label="Confirm password" placeholder="Confirm password" margin="dense" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" disabled={!signupEnabled} onClick={this.handleSubmit}>SIGN UP</Button>
                    </DialogActions>

                </Dialog>

            </>
        )
    }
}

export default Signup;