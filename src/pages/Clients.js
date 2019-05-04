import React from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Grid, Button } from '@material-ui/core';

export default class Clients extends React.Component {
    state = {
        error: '',
        clientData: [],
    }

    componentDidMount(){
        const jwt = localStorage.getItem('JWT');

        axios({
            method: 'GET',
            url: 'http://127.0.0.1:5000/api/v1/clients/index',
            'headers': {
                Authorization: `Bearer ${jwt}`
            }
        }).then(response => {
            this.setState({ clientData: response.data })
        }).catch(error => {
            console.log(error)
            this.setState({ error: 'Not logged in.' })
        })
    }

    render() {
        return(
            <div>
                {(this.state.error !== '') ? <p>You must be logged in to view this page.</p> :
                    <>
                        <Paper style={{ padding: 15 }}>
                            <Grid container spacing={24} style={{ padding: 10 }} justify="flex-end">
                                <Grid item xs={9}>
                                    <Typography variant="h6">Clients</Typography>
                                </Grid>
                                <Grid item xs={3} style={{ textAlign: 'right' }}>
                                    <Button color="secondary" onClick={this.handleDialog}>Add Client</Button>
                                </Grid>
                            </Grid>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Client</TableCell>
                                        <TableCell>Industry</TableCell>
                                        <TableCell>Country</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.clientData.sort((a, b) => a.id - b.id).map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.industry}</TableCell>
                                            <TableCell>{row.country}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </Paper></>
                }
            </div>
        )
    }
}