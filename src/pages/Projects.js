import React from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';


export default class Projects extends React.Component {
    state = {
        error: '',
        projectData: [],
    }

    componentDidMount(){
        const jwt = localStorage.getItem('JWT');

        axios({
            method: 'GET',
            url: 'http://127.0.0.1:5000/api/v1/projects/index',
            'headers': {
                Authorization: `Bearer ${jwt}`
            }
        }).then(response => {
            this.setState({ projectData: response.data })
        }).catch(error => {
            this.setState({ error: 'Not logged in.' })
        })
    }

    render() {
        return(
            <div>
                <Typography variant="h4">Projects</Typography>
                {(this.state.error !== '') ? <p>You must be logged in to view this page.</p> : '' }
                <Paper>
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
                </Paper>


            </div>
        )
    }
}