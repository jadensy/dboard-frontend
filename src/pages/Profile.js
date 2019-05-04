import React from 'react';
import axios from 'axios';
import { Paper, Typography, TextField, Button } from '@material-ui/core';


export default class Profile extends React.Component {
    state = {
        disabled: true,
        edit: false,
        username: '',
        email: '',
        password: '',
        confirmPwd: '',
        errors: '',
    }

    componentDidMount(){
        const jwt = localStorage.getItem('JWT');

        axios({
            method: 'GET',
            url: 'http://127.0.0.1:5000/api/v1/users/me',
            'headers': {
                Authorization: `Bearer ${jwt}`
            }
        }).then(response => {
            this.setState({
                username: response.data.username,
                email: response.data.email,
            })
            localStorage.setItem('User', response.data.username)
        }).catch(error => {
            console.log(error)
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleEdit = (e) => {
        e.preventDefault();
        this.setState({
            disabled: !this.state.disabled,
            edit: !this.state.edit,
            password: ''
        })
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const jwt = localStorage.getItem('JWT');

        axios({
            method: 'PUT',
            url: 'http://127.0.0.1:5000/api/v1/users/me',
            'headers': {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            data: {
                username: String(this.state.username),
                ...(this.state.password !== '' ?
                {password: String(this.state.password)} : null
                )
            }
        }).then(response => {
            console.log(response)
            if (response.data.status === "success") {
                this.setState({ edit: false, disabled: true })
            } else {
                this.setState({ message: response.data.message })
            }
        }).catch(error => {
            console.log(error)
            this.setState({ message: "Something went wrong. Please try again." })
        })
    }

    render() {
        const { username, password, confirmPwd } = this.state
        const pwdMatch = password === confirmPwd;
        const enableButton = (username !== '' && username !== localStorage.getItem('User')) || pwdMatch;

        return(
            <div>
                <Paper style={{ padding: 15 }}>
                    <Typography variant="h6">Profile</Typography>
                    <br />
                    <TextField id="username" label="Username" margin="dense"
                        value={this.state.username}
                        disabled={this.state.disabled}
                        onChange={this.handleInput} /><br />
                    <TextField id="email" label="Email" margin="dense"
                        value={this.state.email}
                        disabled
                        helperText={this.state.edit ? "Email cannot be changed." : ""}
                        onChange={this.handleInput} /><br />

                    {this.state.edit ?
                        <>
                        <TextField id="password" label="New Password"
                            type="password" margin="dense"
                            onChange={this.handleInput} /> <br />
                        <TextField id="confirmPwd" label="Confirm New Password"
                            error={!pwdMatch} helperText={!pwdMatch ? "Passwords do not match" : ""}
                            type="password" margin="dense"
                            onChange={this.handleInput} /> <br />
                        </>
                    :
                        null
                    }

                    <br />
                    {this.state.edit
                        ? <><Button color="secondary" disabled={!enableButton}
                            onClick={this.handleUpdate}>Save details</Button>
                            <Button color="secondary" onClick={this.handleEdit}>Cancel</Button>
                            </>
                        : <Button color="secondary" onClick={this.handleEdit}>Edit Profile</Button>
                    }
                </Paper>
            </div>
        )
    }
}