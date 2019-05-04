import React from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Grid,
        Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

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

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
today = `${yyyy}-${mm}-${dd}`

export default class Projects extends React.Component {
    state = {
        error: '',
        projectData: [],
        clientData: [],
        dialog: false,
        npDate: today,
        npName: '',
        npClient: '',
        npType: '',
        npCurrency: '',
        npTotal: '',
    }

    componentDidMount(){
        const jwt = localStorage.getItem('JWT');

        Promise.all([
            axios({
                method: 'GET',
                url: 'http://127.0.0.1:5000/api/v1/projects/index',
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
                projectData: response[0].data,
                clientData: response[1].data,
            })
        }).catch(error => {
            this.setState({ error: 'Not logged in.' })
        })
    }

    handleDialog = () => {
        this.setState({ dialog: !this.state.dialog })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.npDate)
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/v1/projects/',
            'headers': {
                'Content-Type': 'application/json'
            },
            data: {
                name: String(this.state.npName),
                projectType: String(this.state.npType),
                clientID: this.state.npClient,
                date: String(this.state.npDate),
                currency: String(this.state.npCurrency),
                total: this.state.npTotal
            }
        }).then(response => {
            console.log(response)
        }).catch(error =>{
            console.log(error)
        })
        this.handleDialog();
    }

    render() {
        return(
            <div>
                {(this.state.error !== '') ? <p>You must be logged in to view this page.</p> :
                <>
                <Paper style={{ padding: 15 }}>
                    <Grid container spacing={24} style={{ padding: 10}} justify="flex-end">
                        <Grid item xs={9}>
                            <Typography variant="h6">Projects</Typography>
                        </Grid>
                        <Grid item xs={3} style={{textAlign: 'right'}}>
                            <Button color="secondary" onClick={this.handleDialog}>Add Project</Button>
                        </Grid>
                    </Grid>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Project</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.projectData.sort((a,b) => a.id - b.id).map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.client_name}</TableCell>
                                    <TableCell>{row.project_type}</TableCell>
                                    <TableCell>{row.currency} {row.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper></>
                }

                <Dialog open={this.state.dialog} onClose={this.handleDialog}>
                    <DialogTitle>New Project</DialogTitle>
                    <DialogContent style={{ width: 450 }}>
                        <TextField id="npDate" type="date" defaultValue={today}
                            onChange={this.handleInput}
                            label="Date" margin="dense" fullWidth /><br />

                        <TextField id="npName" onChange={this.handleInput}
                            label="Project Name" placeholder="Project Name" margin="dense" fullWidth />

                        <TextField select id="npClient" onChange={this.handleInput}
                            label="Client" value={this.state.npClient || " "}
                            SelectProps={{ native: true, }}
                            margin="dense" fullWidth >
                            <option value="" >Select a client</option>
                            {this.state.clientData.map(client => (
                                <option key={client.name} value={client.id}>
                                    {client.name}
                                </option>
                            ))}
                        </TextField>

                        <TextField id="Type" onChange={this.handleInput}
                            label="Project Type" placeholder="Project Type" margin="dense" fullWidth />

                        <TextField select id="npCurrency" onChange={this.handleInput}
                            label="Currency" value={this.state.npCurrency || " "}
                            SelectProps={{ native: true, }}
                            margin="dense" fullWidth >
                            {currencies.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>

                        <TextField id="npTotal" onChange={this.handleInput}
                            label="Total" placeholder="Total" margin="dense" fullWidth />

                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={this.handleSubmit}>Add Project</Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}