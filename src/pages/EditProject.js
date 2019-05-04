import React from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Grid } from '@material-ui/core';

const currencies = [
    {
        value: 'MYR',
        label: 'MYR',
    },
    {
        value: 'SGD',
        label: 'SGD',
    },
    {
        value: 'HKD',
        label: 'HKD',
    },
    {
        value: 'USD',
        label: 'USD',
    },
];

class EditProject extends React.Component {
    state = {
        confirm: false,
        date: '',
        name: '',
        client: '',
        clientID: '',
        type: '',
        currency: '',
        total: '',
        clientData: [],
        message: '',
        error: '',
    }
    componentDidMount(){
        console.log(this.props)
        const jwt = localStorage.getItem('JWT');

        Promise.all([
            axios({
                method: 'GET',
                url: `http://127.0.0.1:5000/api/v1/projects/${this.props.match.params.id}`,
                'headers': {
                    Authorization: `Bearer ${jwt}`
                }
            }),
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:5000/api/v1/clients/index',
                'headers': {
                    Authorization: `Bearer ${jwt}`
                }
            }),
        ]).then(response => {
            this.setState({
                date: response[0].data.date,
                name: response[0].data.name,
                client: response[0].data.client_name,
                clientID: response[0].data.client_id,
                type: response[0].data.project_type,
                currency: response[0].data.currency,
                total: response[0].data.total,
                clientData: response[1].data,
            })
        }).catch(error => {
            this.setState({ error: 'Not logged in.' })
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const jwt = localStorage.getItem('JWT');
        axios({
            method: 'PUT',
            url: `http://127.0.0.1:5000/api/v1/projects/${this.props.match.params.id}/update`,
            'headers': {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            data: {
                name: this.state.name,
                projectType: this.state.type,
                clientID: this.state.clientID,
                date: this.state.date,
                currency: this.state.currency,
                total: this.state.total
            }
        }).then(response => {
            console.log(response)
            if (response.data.status === "success") {
                this.setState({ message: response.data.message })
                this.props.history.push("/projects")
            } else {
                this.setState({ message: response.data.message })
            }
        }).catch(error => {
            console.log(error)
            this.setState({ message: "Something went wrong. Please try again." })
        })
    }

    handleDelete= (e) => {
        e.preventDefault();
        const jwt = localStorage.getItem('JWT');
        axios({
            method: 'POST',
            url: `http://127.0.0.1:5000/api/v1/projects/${this.props.match.params.id}/delete`,
            'headers': {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }).then(response => {
            console.log(response)
            if (response.data.status === "success") {
                this.setState({ message: response.data.message })
                this.props.history.push("/projects")
            } else {
                this.setState({ message: response.data.message })
            }
        }).catch(error => {
            console.log(error)
            this.setState({ message: "Something went wrong. Please try again." })
        })
    }

    render() {
        return(
            <div>
                <Paper style={{ padding: 15 }}>
                    <Grid container spacing={24}  justify="flex-end">
                        <Grid item xs={9}>
                            <Typography variant="h6">Edit Project</Typography>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: 'right' }}>
                            <Button color="secondary" onClick={this.handleDelete}>DELETE</Button>
                        </Grid>
                    </Grid>
                    <TextField id="name" onChange={this.handleInput} value={this.state.name}
                        label="Project Name" placeholder="Project Name" margin="dense" fullWidth />

                    <TextField id="date" type="date" value={this.state.date}
                        onChange={this.handleInput}
                        label="Date" margin="dense" fullWidth /><br />

                    <TextField select id="client" onChange={this.handleInput}
                        label="Client" value={this.state.client}
                        // ** default option not loading through state.
                        SelectProps={{ native: true, }}
                        margin="dense" fullWidth >
                        <option value="" >Select a client</option>
                        {this.state.clientData.map(client => (
                            <option key={client.name} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </TextField>

                    <TextField id="type" onChange={this.handleInput} value={this.state.type}
                        label="Project Type" placeholder="Project Type" margin="dense" fullWidth />

                    <TextField select id="currency" onChange={this.handleInput}
                        label="Currency" value={this.state.currency || " "}
                        SelectProps={{ native: true, }}
                        margin="dense" fullWidth >
                        {currencies.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>

                    <TextField id="total" onChange={this.handleInput} value={this.state.total}
                        label="Total" placeholder="Total" margin="dense" fullWidth />
                    <br />
                    <br />
                    <Button color="secondary" onClick={this.handleSubmit}>Save</Button>
                    <Button color="secondary" href="/projects">Cancel</Button>
                </Paper>
            </div>
        )
    }
}

export default EditProject;