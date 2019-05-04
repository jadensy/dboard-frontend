import React from 'react';
import axios from 'axios';
import { Typography, Grid, Paper } from '@material-ui/core';
import LineChartNew from '../components/LineChart'

class Dashboard extends React.Component {

    state = {
        responseData: {},
        project_count: '',
        client_count: 0,
        countries: 0,
        currency_types: {},
        project_types: {},
        currency_revenue: {},
        project_revenue: {},
    }

    componentDidMount() {
        const jwt = localStorage.getItem('JWT');

        axios({
            method: 'GET',
            url: 'http://127.0.0.1:5000/api/v1/dashboard/',
            'headers': {
                Authorization: `Bearer ${jwt}`
            }
        }).then(response => {
            console.log(response.data);
            console.log(response.data.project_count);

            this.setState({
                project_count: response.data.project_count,

            });
        }).catch(error => {
            console.log(error)
        })



    }

    render() {
        console.log(this.project_count)
        return(
            <div>
            <Paper style={{ padding: 15 }}>
                <Typography variant="h6">Dashboard</Typography>
                {/* <LineChartNew /> */}
            </Paper>
            </div>
        )
    }
}

export default Dashboard;

