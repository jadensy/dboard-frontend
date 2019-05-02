import React from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';


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
            console.log(this.state.clientData)
        }).catch(error => {
            console.log(error)
            this.setState({ error: 'Not logged in.' })
        })
    }

    render() {
        return(
            <div>
                <Typography variant="h4">Clients</Typography>
                {(this.state.error !== '') ? <p>You must be logged in to view this page.</p> : '' }
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Client</TableCell>
                                <TableCell>Industry</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>Projects</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.clientData.sort((a,b) => a.id - b.id).map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.industry}</TableCell>
                                    <TableCell>{row.country}</TableCell>
                                    {/* <TableCell>COUNT # OF PROJECTS PER CLIENT</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </Paper>


            </div>
        )
    }
}