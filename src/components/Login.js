import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import axios from 'axios';

class Login extends React.Component {
    state = {
        dialogOpen: false,
        email: '',
        password: '',
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
        console.log(this.state.password, this.state.email);

        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/v1/sessions/',
            'headers': {
                'Content-Type': 'application/json'
            },
            data: {
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
    }

    render() {
        const { email, password } = this.state

        const emailRegex = email === "" || (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(email);
        const loginEnabled = email !== '' && emailRegex && password !== '';

        return(
            <>
                <Button color="inherit" onClick={this.handleDialog}>
                    Log In
                </Button>

                <Dialog open={this.state.dialogOpen} onClose={this.handleDialog}>
                    <DialogTitle>Log In</DialogTitle>
                    <DialogContent style={{ width: 250 }}>
                        <TextField id="email" onChange={this.handleInput}
                            error={!emailRegex} helperText={!emailRegex ? "Please enter a valid email" : ""}
                            label="Email" placeholder="Email" margin="dense" fullWidth /><br />
                        <TextField id="password" onChange={this.handleInput}
                            type="password"
                            label="Password" placeholder="Password" margin="dense" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" disabled={!loginEnabled} onClick={this.handleSubmit}>Log In</Button>
                    </DialogActions>

                </Dialog>

            </>
        )
    }
}

export default Login;