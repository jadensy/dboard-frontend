import React from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Grid,
        Dialog, DialogActions, DialogContent, DialogTitle, TextField, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
        updateData: [],
    }

    componentDidMount(){
        const jwt = localStorage.getItem('JWT');

        Promise.all([
            axios({
                method: 'GET',
                url: 'https://quiet-anchorage-67868.herokuapp.com/api/v1/projects/index',
                'headers': {
                    Authorization: `Bearer ${jwt}`
                }
            }),
            axios({
                method: 'GET',
                url: 'https://quiet-anchorage-67868.herokuapp.com/api/v1/clients/index',
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
        axios({
            method: 'POST',
            url: 'https://quiet-anchorage-67868.herokuapp.com/api/v1/projects/',
            'headers': {
                'Content-Type': 'application/json'
            },
            data: {
                name: String(this.state.npName),
                projectType: this.state.npType,
                clientID: this.state.npClient,
                date: String(this.state.npDate),
                currency: String(this.state.npCurrency),
                total: this.state.npTotal
            }
        }).then(response => {
            if (response.data.status === "success") {
                let newData = {
                    ...response.data.project,
                    'client_name': response.data.project.client.name
                }
                this.setState({ message: response.data.message })
                this.setState(prevState => ({
                    projectData: [...prevState.projectData, newData]
                }))
            } else {
                this.setState({ message: response.data.message })
            }
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
                        <colgroup>
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '5%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '5%' }} />
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Project</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell align="right">Currency</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.projectData.sort(
                                (a, b) => Math.abs(new Date(b.date)) - Math.abs(new Date(a.date))).map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.client_name}</TableCell>
                                    <TableCell>{row.project_type}</TableCell>
                                    <TableCell align="right">{row.currency}</TableCell>
                                    <TableCell align="right">{parseFloat(row.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                                    <TableCell>
                                        <Link to={"projects/" + row.id}>
                                            <Icon style={{ color: '#808080', fontSize: 15 }}>edit</Icon>
                                        </Link>
                                    </TableCell>
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

                        <TextField id="npType" onChange={this.handleInput}
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